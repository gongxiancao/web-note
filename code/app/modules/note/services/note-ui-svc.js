'use strict';


angular.module('note').service('NoteUiService', ['$rootScope', '$q', 'DialogService', 'NoteEntity', 'UtilityService',
    function ($rootScope, $q, DialogService, NoteEntity, UtilityService) {
        this.newNoteAdded = 'newNoteAdded';

        this.openAddNewNote = function(note) {
            var that = this,
                scope = $rootScope.$new(),
                opts = {
                    title: 'Add new note',
                    contentUrl: 'modules/note/templates/add-note.tpl.html',
                    buttonInfos: [
                        {
                            label: 'Save',
                            primary: true,
                            disabled: UtilityService.$false,
                            handler: function () {
                                this.close();
                                var note = scope.model;
                                NoteEntity.save(note).$promise.then(
                                    function () {
                                        $rootScope.$broadcast(that.newNoteAdded, note);
                                    },
                                    function (err) {
                                        throw err;
                                    }
                                );
                            }
                        },
                        {
                            label: 'Cancel',
                            primary: false,
                            disabled: UtilityService.$false,
                            handler: function () {
                                this.close();
                            }
                        }
                    ],
                    windowClass: "modal add-note"
                };
            scope.model = {};
            return DialogService.open(opts, scope);
        }

}]);
