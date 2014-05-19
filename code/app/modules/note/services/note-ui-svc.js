'use strict';

angular.module('note').service('NoteUiService', ['$rootScope', '$q', 'DialogService', 'NoteEntity', 'UtilityService',
    function ($rootScope, $q, DialogService, NoteEntity, UtilityService) {
        var that = this;
        this.newNoteAdded = 'newNoteAdded';
        this.noteChanged = 'noteChanged';
        this.nodeSelected = 'noteSelected';

        this.openAddNewNote = function() {
            var scope = $rootScope.$new(),
                opts = {
                    title: 'Add new note',
                    contentUrl: 'modules/note/templates/add-note.tpl.html',
                    buttonInfos: [
                        {
                            label: 'Save',
                            class: 'btn-primary',
                            disabled: UtilityService.$false,
                            handler: function () {
                                this.close();
                                var note = scope.model;
                                that.save(note);
                            }
                        },
                        {
                            label: 'Cancel',
                            class: 'btn-warning',
                            disabled: UtilityService.$false,
                            handler: function () {
                                this.close();
                            }
                        }
                    ],
                    windowClass: 'modal add-note'
                };
            scope.model = {};
            return DialogService.open(opts, scope);
        };

        this.save = function (note) {
            var deferred = $q.defer();
            NoteEntity.save(note).$promise.then(
                function (data) {
                    if(note.id) {
                        $rootScope.$broadcast(that.noteChanged, note);
                    } else {
                        $rootScope.$broadcast(that.newNoteAdded, note);
                    }
                    deferred.resolve(data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        };
    }
]);
