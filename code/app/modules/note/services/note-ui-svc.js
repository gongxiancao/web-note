'use strict';


angular.module('note').service('NoteUiService', ['$rootScope', '$q', 'DialogService', 'NoteEntity', 'CategoryService', 'UtilityService',
    function ($rootScope, $q, DialogService, NoteEntity, CategoryService, UtilityService) {
        this.newNoteAdded = 'newNoteAdded';
        this.newCategoryAdded = 'newCategoryAdded';

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

        this.openAddNewCategory = function(category) {
            var that = this;
            var opts = {
                    title: 'Add new category',
                    contentUrl: 'modules/note/templates/add-category.tpl.html',
                    buttonInfos: [
                        {
                            label: 'Save',
                            primary: true,
                            disabled: UtilityService.$false,
                            handler: function (category) {
                                this.close(category);
                                category.save().then(
                                    function (category) {
                                        $rootScope.$broadcast(that.newCategoryAdded, category);
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
                    windowClass: "modal add-category"
                };

            return DialogService.open(opts, category);
        }
}]);
