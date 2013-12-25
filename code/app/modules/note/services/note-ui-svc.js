'use strict';


angular.module('note').service('NoteUiService', ['$rootScope', '$q', 'DialogService', 'NoteService', 'CategoryService', 'UtilityService',
    function ($rootScope, $q, DialogService, NoteService, CategoryService, UtilityService) {
        this.newNoteAdded = 'newNoteAdded';
        this.newCategoryAdded = 'newCategoryAdded';

        this.openAddNewNote = function(note) {
            var that = this;
            var opts = {
                    title: 'Add new note',
                    contentUrl: 'modules/note/views/add-note.html',
                    buttonInfos: [
                        {
                            label: 'Save',
                            primary: true,
                            disabled: UtilityService.$false,
                            handler: function (note) {
                                this.close(note);
                                note.save().then(
                                    function (note) {
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
                    modalClass: "modal add-note"
                };

            return DialogService.open(opts, note);
        }

        this.openAddNewCategory = function(category) {
            var that = this;
            var opts = {
                    title: 'Add new category',
                    contentUrl: 'modules/note/views/add-category.html',
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
                    modalClass: "modal add-category"
                };

            return DialogService.open(opts, category);
        }
}]);
