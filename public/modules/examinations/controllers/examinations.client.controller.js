'use strict';

// Examinations controller
angular.module('examinations').controller('ExaminationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Examinations', 'lodash', '$q', 'Patients', 'CoreProperties', 'ActionsHandler', 'Toolbar', 'Logger',
    function ($scope, $stateParams, $location, Authentication, Examinations, lodash, $q, Patients, CoreProperties, ActionsHandler, Toolbar, Logger) {
        $scope.authentication = Authentication;

        $scope.tabsConfig = {};
        $scope.tabsConfig.showResuls = false;

        //$scope.examination={};
        /*$scope.examination.colors=null;
         $scope.availableColors=['Red', 'Green', 'Yellow', 'Cool', 'Purple', 'Moove', 'Create', 'Do']*/
        $scope.tagTransform = function (newTag) {
            var item = {
                label: newTag,
                value: newTag.toLowerCase()
            };
            return item;
        };
        $scope.forms = {};
        // $scope.dummy.examinationForm="examinationForm";

        //region schema form
        $scope.form = [
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5 topMargin",
                        "items": [
                            {   key: "oculusDexter.appearance",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label topMargin ng-binding\">Appearance</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5 topMargin",
                        "items": [
                            {   key: "oculusSinister.appearance",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.eyeLid",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Eye Lid</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.eyeLid",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.lacrimalSystem",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Lacrimal System</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.lacrimalSystem",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.conjunctiva",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Conjunctiva</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.conjunctiva",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.sclera",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Sclera</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.sclera",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.cornea",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Cornea</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.cornea",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.anteriorChamber",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Anterior Chamber</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.anteriorChamber",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.iris",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Iris</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.iris",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.pupil",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Pupil</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.pupil",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.lens",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Lens</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.lens",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.fundus",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Fundus</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.fundus",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.opticNerve",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Optic Nerve</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.opticNerve",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.eom",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">EOM</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.eom",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.va",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">V/A</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.va",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.bcva",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">BCVA</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.bcva",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.bcvaWith",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">BCVA With</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.bcvaWith",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.iop",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">IOP</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.iop",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "key": "comment",
                "type": "textarea",
                "placeholder": "Make a comment"
            }
        ];

        $scope.schema = {
            "type": "object",
            "title": "Examination",
            "properties": {
                "oculusDexter": {"type": "object",
                    "properties": {
                        "appearance": {
                            "title": "Appearance",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "eyeLid": {
                            "title": "Eye Lid",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "No Abnormality Detected",
                            items: [
                                { value: 'rl', label: 'RL' },
                                { value: 'entropion', label: 'Entropion' },
                                { value: 'ectropion', label: 'Ectropion' },
                                { value: 'eistichiasis', label: 'Distichiasis' },
                                { value: 'ptosis', label: 'Ptosis' },
                                { value: 'chalazion', label: 'Chalazion' },
                                { value: 'stye', label: 'Stye' },
                                { value: 'blepharitis', label: 'Blepharitis' },
                                { value: 'mass', label: 'Mass' },
                                { value: 'madarosis', label: 'Madarosis' },
                                { value: 'epicanthaus', label: 'Epicanthaus' },
                                { value: 'blepharochalasis', label: 'Blepharochalasis' },
                                { value: 'dermatochalasis', label: 'Dermatochalasis' },
                                { value: 'oedema', label: 'Oedema' }
                            ]
                        },
                        "lacrimalSystem": {
                            "title": "Lacrimal System",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "conjunctiva": {
                            "title": "Conjunctiva",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'active-trachoma', label: 'Active trachoma' },
                                { value: 't-iii', label: 'T III' },
                                { value: 'mpc', label: 'MPC' },
                                { value: 'pc', label: 'PC' },
                                { value: 'allergy', label: 'Allergy' },
                                { value: 'vernal-keratoconjunctivitis', label: 'Vernal keratoconjunctivitis' },
                                { value: 'ptrygeum', label: 'Ptrygeum' },
                                { value: 'ptds', label: 'PTDs' }
                            ]
                        },
                        "sclera": {
                            "title": "Sclera",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'nodular-episcleritis', label: 'Nodular Episcleritis' },
                                { value: 'diffuse-episcleritis', label: 'Diffuse Episcleritis' },
                                { value: 'scleritis', label: 'Scleritis' }
                            ]
                        },
                        "cornea": {
                            "title": "Cornea",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Ps, Clear Centre",
                            items: [
                                { value: 'scar-of-previous-op.', label: 'Scar of previous op.' },
                                { value: 'ps', label: 'Ps' },
                                { value: 'nebula', label: 'Nebula' },
                                { value: 'corneal-ulcer', label: 'Corneal Ulcer' },
                                { value: 'leukoma-adherent', label: 'Leukoma adherent' },
                                { value: 'leukoma-non-adherent', label: 'Leukoma non-adherent' },
                                { value: 'keratitis', label: 'Keratitis' },
                                { value: 'keratoconus', label: 'Keratoconus' },
                                { value: 'arcus-senilis', label: 'Arcus senilis' },
                                { value: 'degeneration', label: 'Degeneration' },
                                { value: 'stromal-dystophy', label: 'Stromal Dystophy' },
                                { value: 'endothelial-dystophy', label: 'Endothelial Dystophy' },
                                { value: 'epithelial-oedema', label: 'Epithelial Oedema' },
                                { value: 'stromal oedema', label: 'Stromal Oedema' },
                                { value: 'striated-keratopathy', label: 'Striated Keratopathy' }
                            ]
                        },
                        "anteriorChamber": {
                            "title": "Anterior Chamber",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Depth No Abnormal Content",
                            items: [
                                { value: 'cells', label: 'Cells' },
                                { value: 'flare', label: 'Flare' },
                                { value: 'level-hyphema', label: 'level Hyphema' },
                                { value: 'diffuse-hyphema', label: 'Diffuse Hyphema' },
                                { value: 'inflammatory-membrane', label: 'Inflammatory membrane' },
                                { value: 'hypopion', label: 'Hypopion' }
                            ]
                        },
                        "iris": {
                            "title": "Iris",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Color And Pattern",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                            /*,
                             items: [
                             { value: '1', label: 'Normal' }
                             ]*/
                        },
                        "pupil": {
                            "title": "Pupil",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "R R R Direct and Cons.",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                            /*,
                             items: [
                             { value: '1', label: 'Normal' }
                             ]*/
                        },
                        "lens": {
                            "title": "Lens",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Clear In Place",
                            items: [
                                { value: 'imsc', label: 'IMSC' },
                                { value: 'nuclear-cataract', label: 'Nuclear cataract' },
                                { value: 'complicated-cataract', label: 'Complicated cataract' },
                                { value: 'subluxated', label: 'Subluxated' },
                                { value: 'pseudoexfoliation', label: 'Pseudoexfoliation' },
                                { value: 'microspherophakia', label: 'Microspherophakia' }
                            ]
                        },
                        "fundus": {
                            "title": "Fundus",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'tessellated', label: 'Tessellated' },
                                { value: 'myopic', label: 'Myopic' },
                                { value: 'mild-npdr', label: 'Mild NPDR' },
                                { value: 'sever npdr', label: 'Sever NPDR' },
                                { value: 'pdr', label: 'PDR' },
                                { value: 'macular-oedema', label: 'Macular Oedema' },
                                { value: 'drusen', label: 'Drusen' },
                                { value: 'amd', label: 'AMD' },
                                { value: 'vein-occlusion', label: 'Vein occlusion' },
                                { value: 'artery-occlusion', label: 'Artery occlusion' }
                            ]
                        },
                        "opticNerve": {
                            "title": "Optic Nerve",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'pale', label: 'Pale' },
                                { value: 'atrophy', label: 'Atrophy' },
                                { value: 'increased-cd-ratio', label: 'Increased C/D ratio' },
                                { value: 'cupping', label: 'Cupping' },
                                { value: 'papilloedema', label: 'Papilloedema' },
                                { value: 'tilted', label: 'Tilted' }
                            ]
                        },
                        "va": {
                            "title": "V/A",
                            "type": "string"
                        },
                        "eom": {
                            "title": "EOM",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Free Balanced Ocular Motility In The Sex Cardinal Directions",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                            /*,
                             items: [
                             { value: '1', label: 'Normal' }
                             ]*/
                        },
                        "bcva": {
                            "title": "BCVA",
                            "type": "string"
                        },
                        "bcvaWith": {
                            "title": "BCVA With",
                            "type": "string"
                        },
                        "iop": {
                            "title": "IOP",
                            "type": "string"
                        }
                    }
                },
                "oculusSinister": {"type": "object",
                    "properties": {
                        "appearance": {
                            "title": "Appearance",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "eyeLid": {
                            "title": "Eye Lid",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "No Abnormality Detected",
                            items: [
                                { value: 'rl', label: 'RL' },
                                { value: 'entropion', label: 'Entropion' },
                                { value: 'ectropion', label: 'Ectropion' },
                                { value: 'eistichiasis', label: 'Distichiasis' },
                                { value: 'ptosis', label: 'Ptosis' },
                                { value: 'chalazion', label: 'Chalazion' },
                                { value: 'stye', label: 'Stye' },
                                { value: 'blepharitis', label: 'Blepharitis' },
                                { value: 'mass', label: 'Mass' },
                                { value: 'madarosis', label: 'Madarosis' },
                                { value: 'epicanthaus', label: 'Epicanthaus' },
                                { value: 'blepharochalasis', label: 'Blepharochalasis' },
                                { value: 'dermatochalasis', label: 'Dermatochalasis' },
                                { value: 'oedema', label: 'Oedema' }
                            ]
                        },
                        "lacrimalSystem": {
                            "title": "Lacrimal System",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "conjunctiva": {
                            "title": "Conjunctiva",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'active-trachoma', label: 'Active trachoma' },
                                { value: 't-iii', label: 'T III' },
                                { value: 'mpc', label: 'MPC' },
                                { value: 'pc', label: 'PC' },
                                { value: 'allergy', label: 'Allergy' },
                                { value: 'vernal-keratoconjunctivitis', label: 'Vernal keratoconjunctivitis' },
                                { value: 'ptrygeum', label: 'Ptrygeum' },
                                { value: 'ptds', label: 'PTDs' }
                            ]
                        },
                        "sclera": {
                            "title": "Sclera",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'nodular-episcleritis', label: 'Nodular Episcleritis' },
                                { value: 'diffuse-episcleritis', label: 'Diffuse Episcleritis' },
                                { value: 'scleritis', label: 'Scleritis' }
                            ]
                        },
                        "cornea": {
                            "title": "Cornea",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Ps, Clear Centre",
                            items: [
                                { value: 'scar-of-previous-op.', label: 'Scar of previous op.' },
                                { value: 'ps', label: 'Ps' },
                                { value: 'nebula', label: 'Nebula' },
                                { value: 'corneal-ulcer', label: 'Corneal Ulcer' },
                                { value: 'leukoma-adherent', label: 'Leukoma adherent' },
                                { value: 'leukoma-non-adherent', label: 'Leukoma non-adherent' },
                                { value: 'keratitis', label: 'Keratitis' },
                                { value: 'keratoconus', label: 'Keratoconus' },
                                { value: 'arcus-senilis', label: 'Arcus senilis' },
                                { value: 'degeneration', label: 'Degeneration' },
                                { value: 'stromal-dystophy', label: 'Stromal Dystophy' },
                                { value: 'endothelial-dystophy', label: 'Endothelial Dystophy' },
                                { value: 'epithelial-oedema', label: 'Epithelial Oedema' },
                                { value: 'stromal oedema', label: 'Stromal Oedema' },
                                { value: 'striated-keratopathy', label: 'Striated Keratopathy' }
                            ]
                        },
                        "anteriorChamber": {
                            "title": "Anterior Chamber",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Depth No Abnormal Content",
                            items: [
                                { value: 'cells', label: 'Cells' },
                                { value: 'flare', label: 'Flare' },
                                { value: 'level-hyphema', label: 'level Hyphema' },
                                { value: 'diffuse-hyphema', label: 'Diffuse Hyphema' },
                                { value: 'inflammatory-membrane', label: 'Inflammatory membrane' },
                                { value: 'hypopion', label: 'Hypopion' }
                            ]
                        },
                        "iris": {
                            "title": "Iris",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Color And Pattern",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "pupil": {
                            "title": "Pupil",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "R R R Direct and Cons.",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "lens": {
                            "title": "Lens",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Clear In Place",
                            items: [
                                { value: 'imsc', label: 'IMSC' },
                                { value: 'nuclear-cataract', label: 'Nuclear cataract' },
                                { value: 'complicated-cataract', label: 'Complicated cataract' },
                                { value: 'subluxated', label: 'Subluxated' },
                                { value: 'pseudoexfoliation', label: 'Pseudoexfoliation' },
                                { value: 'microspherophakia', label: 'Microspherophakia' }
                            ]
                        },
                        "fundus": {
                            "title": "Fundus",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'tessellated', label: 'Tessellated' },
                                { value: 'myopic', label: 'Myopic' },
                                { value: 'mild-npdr', label: 'Mild NPDR' },
                                { value: 'sever npdr', label: 'Sever NPDR' },
                                { value: 'pdr', label: 'PDR' },
                                { value: 'macular-oedema', label: 'Macular Oedema' },
                                { value: 'drusen', label: 'Drusen' },
                                { value: 'amd', label: 'AMD' },
                                { value: 'vein-occlusion', label: 'Vein occlusion' },
                                { value: 'artery-occlusion', label: 'Artery occlusion' }
                            ]
                        },
                        "opticNerve": {
                            "title": "Optic Nerve",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'pale', label: 'Pale' },
                                { value: 'atrophy', label: 'Atrophy' },
                                { value: 'increased-cd-ratio', label: 'Increased C/D ratio' },
                                { value: 'cupping', label: 'Cupping' },
                                { value: 'papilloedema', label: 'Papilloedema' },
                                { value: 'tilted', label: 'Tilted' }
                            ]
                        },
                        "eom": {
                            "title": "EOM",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Free Balanced Ocular Motility In The Sex Cardinal Directions",
                            items: [
                                { value: 'test', label: 'Test' }
                            ]
                        },
                        "va": {
                            "title": "V/A",
                            "type": "string"
                        },
                        "bcva": {
                            "title": "BCVA",
                            "type": "string"
                        },
                        "bcvaWith": {
                            "title": "BCVA With",
                            "type": "string"
                        },
                        "iop": {
                            "title": "IOP",
                            "type": "string"
                        }
                    }
                },
                "comment": {
                    "title": "Comment",
                    "type": "string"
                }
            }

        };

        $scope.viewSchema = {
            "type": "object",
            "title": "Examination",
            "properties": {
                "oculusDexter": {"type": "object",
                    "properties": {
                        "appearance": {
                            "title": "Appearance",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal"
                        },
                        "eyeLid": {
                            "title": "Eye Lid",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "No Abnormality Detected",
                            items: [
                                { value: 'rl', label: 'RL' },
                                { value: 'entropion', label: 'Entropion' },
                                { value: 'ectropion', label: 'Ectropion' },
                                { value: 'eistichiasis', label: 'Distichiasis' },
                                { value: 'ptosis', label: 'Ptosis' },
                                { value: 'chalazion', label: 'Chalazion' },
                                { value: 'stye', label: 'Stye' },
                                { value: 'blepharitis', label: 'Blepharitis' },
                                { value: 'mass', label: 'Mass' },
                                { value: 'madarosis', label: 'Madarosis' },
                                { value: 'epicanthaus', label: 'Epicanthaus' },
                                { value: 'blepharochalasis', label: 'Blepharochalasis' },
                                { value: 'dermatochalasis', label: 'Dermatochalasis' },
                                { value: 'oedema', label: 'Oedema' }
                            ]
                        },
                        "lacrimalSystem": {
                            "title": "Lacrimal System",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal"
                        },
                        "conjunctiva": {
                            "title": "Conjunctiva",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'active-trachoma', label: 'Active trachoma' },
                                { value: 't-iii', label: 'T III' },
                                { value: 'mpc', label: 'MPC' },
                                { value: 'pc', label: 'PC' },
                                { value: 'allergy', label: 'Allergy' },
                                { value: 'vernal-keratoconjunctivitis', label: 'Vernal keratoconjunctivitis' },
                                { value: 'ptrygeum', label: 'Ptrygeum' },
                                { value: 'ptds', label: 'PTDs' }
                            ]
                        },
                        "sclera": {
                            "title": "Sclera",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'nodular-episcleritis', label: 'Nodular Episcleritis' },
                                { value: 'diffuse-episcleritis', label: 'Diffuse Episcleritis' },
                                { value: 'scleritis', label: 'Scleritis' }
                            ]
                        },
                        "cornea": {
                            "title": "Cornea",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Ps, Clear Centre",
                            items: [
                                { value: 'scar-of-previous-op.', label: 'Scar of previous op.' },
                                { value: 'ps', label: 'Ps' },
                                { value: 'nebula', label: 'Nebula' },
                                { value: 'corneal-ulcer', label: 'Corneal Ulcer' },
                                { value: 'leukoma-adherent', label: 'Leukoma adherent' },
                                { value: 'leukoma-non-adherent', label: 'Leukoma non-adherent' },
                                { value: 'keratitis', label: 'Keratitis' },
                                { value: 'keratoconus', label: 'Keratoconus' },
                                { value: 'arcus-senilis', label: 'Arcus senilis' },
                                { value: 'degeneration', label: 'Degeneration' },
                                { value: 'stromal-dystophy', label: 'Stromal Dystophy' },
                                { value: 'endothelial-dystophy', label: 'Endothelial Dystophy' },
                                { value: 'epithelial-oedema', label: 'Epithelial Oedema' },
                                { value: 'stromal oedema', label: 'Stromal Oedema' },
                                { value: 'striated-keratopathy', label: 'Striated Keratopathy' }
                            ]
                        },
                        "anteriorChamber": {
                            "title": "Anterior Chamber",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Depth No Abnormal Content",
                            items: [
                                { value: 'cells', label: 'Cells' },
                                { value: 'flare', label: 'Flare' },
                                { value: 'level-hyphema', label: 'level Hyphema' },
                                { value: 'diffuse-hyphema', label: 'Diffuse Hyphema' },
                                { value: 'inflammatory-membrane', label: 'Inflammatory membrane' },
                                { value: 'hypopion', label: 'Hypopion' }
                            ]
                        },
                        "iris": {
                            "title": "Iris",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Color And Pattern"
                            /*,
                             items: [
                             { value: '1', label: 'Normal' }
                             ]*/
                        },
                        "pupil": {
                            "title": "Pupil",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "R R R Direct and Cons."
                            /*,
                             items: [
                             { value: '1', label: 'Normal' }
                             ]*/
                        },
                        "lens": {
                            "title": "Lens",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Clear In Place",
                            items: [
                                { value: 'imsc', label: 'IMSC' },
                                { value: 'nuclear-cataract', label: 'Nuclear cataract' },
                                { value: 'complicated-cataract', label: 'Complicated cataract' },
                                { value: 'subluxated', label: 'Subluxated' },
                                { value: 'pseudoexfoliation', label: 'Pseudoexfoliation' },
                                { value: 'microspherophakia', label: 'Microspherophakia' }
                            ]
                        },
                        "fundus": {
                            "title": "Fundus",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'tessellated', label: 'Tessellated' },
                                { value: 'myopic', label: 'Myopic' },
                                { value: 'mild-npdr', label: 'Mild NPDR' },
                                { value: 'sever npdr', label: 'Sever NPDR' },
                                { value: 'pdr', label: 'PDR' },
                                { value: 'macular-oedema', label: 'Macular Oedema' },
                                { value: 'drusen', label: 'Drusen' },
                                { value: 'amd', label: 'AMD' },
                                { value: 'vein-occlusion', label: 'Vein occlusion' },
                                { value: 'artery-occlusion', label: 'Artery occlusion' }
                            ]
                        },
                        "opticNerve": {
                            "title": "Optic Nerve",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'pale', label: 'Pale' },
                                { value: 'atrophy', label: 'Atrophy' },
                                { value: 'increased-cd-ratio', label: 'Increased C/D ratio' },
                                { value: 'cupping', label: 'Cupping' },
                                { value: 'papilloedema', label: 'Papilloedema' },
                                { value: 'tilted', label: 'Tilted' }
                            ]
                        },
                        "va": {
                            "title": "V/A",
                            "type": "string"
                        },
                        "eom": {
                            "title": "EOM",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Free Balanced Ocular Motility In The Sex Cardinal Directions"
                            /*,
                             items: [
                             { value: '1', label: 'Normal' }
                             ]*/
                        },
                        "bcva": {
                            "title": "BCVA",
                            "type": "string"
                        },
                        "bcvaWith": {
                            "title": "BCVA With",
                            "type": "string"
                        },
                        "iop": {
                            "title": "IOP",
                            "type": "string"
                        }
                    }
                },
                "oculusSinister": {"type": "object",
                    "properties": {
                        "appearance": {
                            "title": "Appearance",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal"
                        },
                        "eyeLid": {
                            "title": "Eye Lid",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "No Abnormality Detected",
                            items: [
                                { value: 'rl', label: 'RL' },
                                { value: 'entropion', label: 'Entropion' },
                                { value: 'ectropion', label: 'Ectropion' },
                                { value: 'eistichiasis', label: 'Distichiasis' },
                                { value: 'ptosis', label: 'Ptosis' },
                                { value: 'chalazion', label: 'Chalazion' },
                                { value: 'stye', label: 'Stye' },
                                { value: 'blepharitis', label: 'Blepharitis' },
                                { value: 'mass', label: 'Mass' },
                                { value: 'madarosis', label: 'Madarosis' },
                                { value: 'epicanthaus', label: 'Epicanthaus' },
                                { value: 'blepharochalasis', label: 'Blepharochalasis' },
                                { value: 'dermatochalasis', label: 'Dermatochalasis' },
                                { value: 'oedema', label: 'Oedema' }
                            ]
                        },
                        "lacrimalSystem": {
                            "title": "Lacrimal System",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal"
                        },
                        "conjunctiva": {
                            "title": "Conjunctiva",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'active-trachoma', label: 'Active trachoma' },
                                { value: 't-iii', label: 'T III' },
                                { value: 'mpc', label: 'MPC' },
                                { value: 'pc', label: 'PC' },
                                { value: 'allergy', label: 'Allergy' },
                                { value: 'vernal-keratoconjunctivitis', label: 'Vernal keratoconjunctivitis' },
                                { value: 'ptrygeum', label: 'Ptrygeum' },
                                { value: 'ptds', label: 'PTDs' }
                            ]
                        },
                        "sclera": {
                            "title": "Sclera",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'nodular-episcleritis', label: 'Nodular Episcleritis' },
                                { value: 'diffuse-episcleritis', label: 'Diffuse Episcleritis' },
                                { value: 'scleritis', label: 'Scleritis' }
                            ]
                        },
                        "cornea": {
                            "title": "Cornea",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Ps, Clear Centre",
                            items: [
                                { value: 'scar-of-previous-op.', label: 'Scar of previous op.' },
                                { value: 'ps', label: 'Ps' },
                                { value: 'nebula', label: 'Nebula' },
                                { value: 'corneal-ulcer', label: 'Corneal Ulcer' },
                                { value: 'leukoma-adherent', label: 'Leukoma adherent' },
                                { value: 'leukoma-non-adherent', label: 'Leukoma non-adherent' },
                                { value: 'keratitis', label: 'Keratitis' },
                                { value: 'keratoconus', label: 'Keratoconus' },
                                { value: 'arcus-senilis', label: 'Arcus senilis' },
                                { value: 'degeneration', label: 'Degeneration' },
                                { value: 'stromal-dystophy', label: 'Stromal Dystophy' },
                                { value: 'endothelial-dystophy', label: 'Endothelial Dystophy' },
                                { value: 'epithelial-oedema', label: 'Epithelial Oedema' },
                                { value: 'stromal oedema', label: 'Stromal Oedema' },
                                { value: 'striated-keratopathy', label: 'Striated Keratopathy' }
                            ]
                        },
                        "anteriorChamber": {
                            "title": "Anterior Chamber",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Depth No Abnormal Content",
                            items: [
                                { value: 'cells', label: 'Cells' },
                                { value: 'flare', label: 'Flare' },
                                { value: 'level-hyphema', label: 'level Hyphema' },
                                { value: 'diffuse-hyphema', label: 'Diffuse Hyphema' },
                                { value: 'inflammatory-membrane', label: 'Inflammatory membrane' },
                                { value: 'hypopion', label: 'Hypopion' }
                            ]
                        },
                        "iris": {
                            "title": "Iris",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal Color And Pattern"
                        },
                        "pupil": {
                            "title": "Pupil",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "R R R Direct and Cons."
                        },
                        "lens": {
                            "title": "Lens",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Clear In Place",
                            items: [
                                { value: 'imsc', label: 'IMSC' },
                                { value: 'nuclear-cataract', label: 'Nuclear cataract' },
                                { value: 'complicated-cataract', label: 'Complicated cataract' },
                                { value: 'subluxated', label: 'Subluxated' },
                                { value: 'pseudoexfoliation', label: 'Pseudoexfoliation' },
                                { value: 'microspherophakia', label: 'Microspherophakia' }
                            ]
                        },
                        "fundus": {
                            "title": "Fundus",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'tessellated', label: 'Tessellated' },
                                { value: 'myopic', label: 'Myopic' },
                                { value: 'mild-npdr', label: 'Mild NPDR' },
                                { value: 'sever npdr', label: 'Sever NPDR' },
                                { value: 'pdr', label: 'PDR' },
                                { value: 'macular-oedema', label: 'Macular Oedema' },
                                { value: 'drusen', label: 'Drusen' },
                                { value: 'amd', label: 'AMD' },
                                { value: 'vein-occlusion', label: 'Vein occlusion' },
                                { value: 'artery-occlusion', label: 'Artery occlusion' }
                            ]
                        },
                        "opticNerve": {
                            "title": "Optic Nerve",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Normal",
                            items: [
                                { value: 'pale', label: 'Pale' },
                                { value: 'atrophy', label: 'Atrophy' },
                                { value: 'increased-cd-ratio', label: 'Increased C/D ratio' },
                                { value: 'cupping', label: 'Cupping' },
                                { value: 'papilloedema', label: 'Papilloedema' },
                                { value: 'tilted', label: 'Tilted' }
                            ]
                        },
                        "eom": {
                            "title": "EOM",
                            "type": "array",
                            format: "uiselect",
                            placeholder: "Free Balanced Ocular Motility In The Sex Cardinal Directions"
                        },
                        "va": {
                            "title": "V/A",
                            "type": "string"
                        },
                        "bcva": {
                            "title": "BCVA",
                            "type": "string"
                        },
                        "bcvaWith": {
                            "title": "BCVA With",
                            "type": "string"
                        },
                        "iop": {
                            "title": "IOP",
                            "type": "string"
                        }
                    }
                },
                "comment": {
                    "title": "Comment",
                    "type": "string"
                }
            },
            "readonly": true
        };

        $scope.viewForm = [
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5 topMargin",
                        "items": [
                            {   key: "oculusDexter.appearance",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                },
                                readonly: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label topMargin ng-binding\">Appearance</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5 topMargin",
                        "items": [
                            {   key: "oculusSinister.appearance",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                },
                                readonly: true

                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.eyeLid",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                },
                                readonly: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Eye Lid</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.eyeLid",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                },
                                readonly: true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.lacrimalSystem",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Lacrimal System</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.lacrimalSystem",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.conjunctiva",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Conjunctiva</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.conjunctiva",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.sclera",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Sclera</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.sclera",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.cornea",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Cornea</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.cornea",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.anteriorChamber",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Anterior Chamber</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.anteriorChamber",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.iris",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Iris</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.iris",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.pupil",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Pupil</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.pupil",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.lens",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Lens</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.lens",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.fundus",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Fundus</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.fundus",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.opticNerve",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">Optic Nerve</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.opticNerve",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.eom",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">EOM</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.eom",
                                feedback: "{'glyphicontop': true, 'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError()}",
                                notitle: true,
                                options: {
                                    tagging: $scope.tagTransform,
                                    taggingLabel: '(new)',
                                    taggingTokens: 'ENTER'
                                }}
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.va",
                                type: "text",
                                notitle: true
                            }
                        ],
                        readonly: true
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">V/A</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.va",
                                notitle: true,
                                type: "text"
                            }
                        ],
                        readonly: true
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.bcva",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">BCVA</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.bcva",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.bcvaWith",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">BCVA With</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.bcvaWith",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusDexter.iop",
                                type: "text",
                                notitle: true
                            }
                        ]
                    },
                    {
                        "type": "help",
                        "helpvalue": "<label class=\"control-label ng-binding\">IOP</label>",
                        "htmlClass": "col-xs-2 col-centered"
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-5",
                        "items": [
                            {   key: "oculusSinister.iop",
                                notitle: true,
                                type: "text"
                            }
                        ]
                    }
                ]
            },
            {
                "key": "comment",
                "type": "textarea",
                "placeholder": "Make a comment"
            }
        ];


        $scope.onSubmit = function (form) {
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');
            // Then we check if the form is valid
            if (form.$valid) {
                //console.log($scope.examination);
                $scope.create();
            }
        }
        //endregion schema form

        // Create new Examination
        $scope.create = function () {

            if($scope.getImageDataUrl){
               var commentsImageData=$scope.getImageDataUrl();
                if(commentsImageData){
                    $scope.examination.commentsImageData=commentsImageData;

                }
            }

            // Create new Examination object
            var examination = new Examinations($scope.examination);
            // Redirect after save
            examination.$save(function (response) {
                $location.path('/examinations/patient/' + examination._patient);
                Logger.success('Examination created successfully', true);
                // Clear form fields
                $scope.examination = {};
            }, function (errorResponse) {
                Logger.error(errorResponse.data.message, true);
                //$scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Examination
        $scope.remove = function (examination) {
            if (examination) {  // ?????????????
                examination.$remove();
                for (var i in $scope.examinations) {
                    if ($scope.examinations[i] === examination) {
                        $scope.examinations.splice(i, 1);
                    }
                }
            } else {

                $scope.examination.$remove(function () {
                    //console.log($scope.examination._patient);
                    if ($location.url().indexOf("/examinations/view/") > -1) {
                        //console.log($scope.examination._patient);
                        $location.path('examinations/patient/' + $scope.examination._patient._id);
                        Logger.success('Examination deleted successfully', true);
                    }
                    else {
                        $location.path('examinations');
                    }
                });
            }
        };

        // Update existing Examination
        $scope.update = function () {

            if($scope.getImageDataUrl){
                var commentsImageData=$scope.getImageDataUrl();
                if(commentsImageData){
                    $scope.examination.commentsImageData=commentsImageData;

                }
            }

            var examination = $scope.examination;
            //console.log(examination._patient);
            examination.$update(function () {
                if ($location.url().indexOf("/examinations/edit") > -1) {
                    $location.path('examinations/view/' + examination._id);
                }
                else {
                    $location.path('examinations/' + examination._id);
                }

                ///log success message
                Logger.success('Examination updated successfully', true);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Examinations
        $scope.find = function () {
            $scope._patient = null;
            Examinations.query(function (res) {
                $scope.examinations = res.list;
            });
        };

        // Find existing Examination

        $scope.findOne = function (callback) {
            Examinations.get({
                examinationId: $stateParams.examinationId
            }, function (_examination) {
                $scope.examination = _examination;
                $scope.canvasVersion=0;
                var canvasOptions={undo: true};

                if($scope.examination.commentsImageData){
                    canvasOptions.imageSrc=$scope.examination.commentsImageData;
                }
                $scope.canvasOptions=canvasOptions;

                $scope.$broadcast('schemaFormRedraw');
                if (callback) {
                    callback();
                }
            });
        };

        // findPatientExaminations
        $scope.findPatientExaminations = function (callback) {
            $scope._patient = $stateParams.patientId;
            $scope.initOne();
            $scope.examination._patient = $stateParams.patientId;
            Patients.get({
                patientId: $stateParams.patientId
            }, function (patient) {
                if (patient) {
                    CoreProperties.setPageSubTitle(patient.fullName);

                    $scope.paginationConfig = {};
                    $scope.paginationConfig.pageSize = 10;
                    $scope.paginationConfig.currentPage = 1;
                    $scope.paginationConfig.totalItems = 0;
                    $scope.paginationConfig.maxSize = 2;
                    $scope.paginationConfig.numPages = 1;
                    $scope.paginationConfig.pageSizeOptions = [10, 50, 100];
                    $scope.paginationConfig.showPagination = false;
                    $scope.fireSearch();
                }
            });
        };

        /*
         // findPatientExaminations
         $scope.findPatientExaminations = function (callback) {
         $scope._patient = $stateParams.patientId;
         $scope.initOne();
         $scope.examination._patient =  $stateParams.patientId;
         Patients.get({
         patientId: $stateParams.patientId
         }, function (patient) {
         if (patient) {
         CoreProperties.setPageSubTitle(patient.fullName);
         var examination = new Examinations($scope.examination);
         Examinations.query(examination, function (_examinations) {
         $scope.examinations = _examinations.list;
         if(callback){
         callback();
         }
         });
         }
         });
         };
         */

        // Search existing Examinations
        $scope.search = function (callback) {
            $scope.examination.paginationConfig = {};
            $scope.examination.paginationConfig.pageNo = $scope.paginationConfig.currentPage;
            $scope.examination.paginationConfig.pageSize = $scope.paginationConfig.pageSize;
            //var examination = new Examinations($scope.examination);
            Examinations.query($scope.examination, function (_examinations) {
                $scope.examinations = _examinations.list;
                if (callback) {
                    callback(_examinations.count);
                }
            });
        };

        $scope.initOne = function () {
            $scope.examination = new Examinations({});
        };

        $scope.canvasUndo=function(){
            $scope.canvasVersion-=1
        };
        $scope.initCreate = function () {
            $scope.initOne();
            $scope.canvasVersion=0;
            $scope.canvasOptions={undo: true};
            Patients.get({
                patientId: $stateParams.patientId
            }, function (patient) {
                if (patient) {
                    $scope.examination._patient = patient._id;
                    CoreProperties.setPageSubTitle(patient.fullName);
                    //Toolbar.addToolbarCommand('clearExamination', 'create_examination', 'Clear', 'refresh', 0);
                    Toolbar.addToolbarCommand('saveExamination', 'create_examination', 'Save', 'floppy-save', 1);
                }
            });
        };

        $scope.initEdit = function () {
            $scope.findOne(function () {
                CoreProperties.setPageSubTitle($scope.examination._patient.fullName + " " + $scope.examination.created.time);
                Toolbar.addToolbarCommand('updateExamination', 'edit_examination', 'Save', 'floppy-save', 0);
            });
        };

        $scope.initView = function () {
            $scope.schema.readonly = true;
            $scope.findOne(function () {
                CoreProperties.setPageSubTitle($scope.examination._patient.fullName + " " + $scope.examination.created.time);
                Toolbar.addToolbarCommand('editExamination', 'edit_examination', 'Edit', 'edit', 1);
                Toolbar.addToolbarCommand('deleteExamination', 'delete_examination', 'Delete', 'trash', 2, null, 'Are you sure to delete examination ?');
            });
        };

        $scope.initSearch = function () {
            $scope.initOne();
            //$scope.tabsConfig = {};
            //$scope.tabsConfig.showResuls = false;
            $scope.paginationConfig = {};
            $scope.paginationConfig.pageSize = 10;
            $scope.paginationConfig.currentPage = 1;
            $scope.paginationConfig.totalItems = 0;
            $scope.paginationConfig.maxSize = 2;
            $scope.paginationConfig.numPages = 1;
            $scope.paginationConfig.pageSizeOptions = [10, 50, 100];
            $scope.paginationConfig.showPagination = false;
            Toolbar.addToolbarCommand('searchExaminations', 'list_examinations', 'Search', 'search', 0);
        };

        $scope.isPageSizeOptionEnabled = function (_option) {
            var optionIndex = $scope.paginationConfig.pageSizeOptions.indexOf(_option);
            if (optionIndex == 0) {
                return true;
            }
            return $scope.paginationConfig.pageSizeOptions[optionIndex - 1] < $scope.paginationConfig.totalItems;
        };

        $scope.isPageSizeOptionSelecetd = function (_option) {
            return  $scope.paginationConfig.pageSize == _option;
        };

        $scope.selectPageSizeOption = function (_option) {
            if ($scope.isPageSizeOptionEnabled(_option)) {
                $scope.paginationConfig.pageSize = _option;
                $scope.fireSearch();
            }
        };

        $scope.pageChanged = function () {
            //console.log($scope.paginationConfig.currentPage);
            $scope.fireSearch();
        };

        $scope.getShowPagination = function () {
            //console.log($scope.paginationConfig.totalItems);
            return $scope.paginationConfig.totalItems > 0;
        };

        $scope.getNumOfPages = function () {
            return  $scope.paginationConfig.totalItems / $scope.paginationConfig.maxSize;
        };

        $scope.fireSearch = function () {
            $scope.search(function (_count) {
                $scope.tabsConfig.showResults = true;
                $scope.paginationConfig.totalItems = _count;
                $scope.paginationConfig.showPagination = $scope.getShowPagination();
                $scope.paginationConfig.numPages = $scope.getNumOfPages();
            });
        };

        $scope.initList = function () {

            CoreProperties.setPageSubTitle("Examinations");
            $scope.initOne();
            //$scope.tabsConfig = {};
            //$scope.tabsConfig.showResuls = false;
            $scope.paginationConfig = {};
            $scope.paginationConfig.pageSize = 10;
            $scope.paginationConfig.currentPage = 1;
            $scope.paginationConfig.totalItems = 0;
            $scope.paginationConfig.maxSize = 2;
            $scope.paginationConfig.numPages = 1;
            $scope.paginationConfig.pageSizeOptions = [10, 50, 100];
            $scope.paginationConfig.showPagination = false;
            $scope.fireSearch();
        };

        /*ActionsHandler.onActionFired('clearExamination', $scope, function (action, args) {
            $scope.forms={};
        });*/

        ActionsHandler.onActionFired('saveExamination', $scope, function (action, args) {
            $scope.onSubmit($scope.forms.examinationForm);
        });

        ActionsHandler.onActionFired('updateExamination', $scope, function (action, args) {
            $scope.update();
        });

        ActionsHandler.onActionFired('searchExaminations', $scope, function (action, args) {
            $scope.fireSearch();
        });

        ActionsHandler.onActionFired('editExamination', $scope, function (action, args) {

            if ($location.url().indexOf("/examinations/view/") > -1) {
                $location.path('examinations/edit/' + $scope.examination._id + '/edit');
            }
            else {
                $location.path('examinations/' + $scope.examination._id + '/edit');
            }


        });

        ActionsHandler.onActionFired('deleteExamination', $scope, function (action, args) {
            $scope.remove();
        });
    }
]);
