'use strict';

//Setting up route
angular.module('examinations').config(['$stateProvider',
	function($stateProvider) {
		// Examinations state routing
		$stateProvider.
		state('listExaminations', {
			url: '/examinations',
			templateUrl: 'modules/examinations/views/list-examinations.client.view.html',
            action: 'list_examinations',
            title:'List Examinations'
		}).
		state('createExamination', {
			url: '/examinations/create',
			templateUrl: 'modules/examinations/views/create-examination.client.view.html',
            action: 'create_examination',
            title:'Create Examination'
		}).
		state('viewExamination', {
			url: '/examinations/:examinationId',
			templateUrl: 'modules/examinations/views/view-examination.client.view.html',
            action: 'view_examination',
            title:'View Examination'
		}).
		state('editExamination', {
			url: '/examinations/:examinationId/edit',
			templateUrl: 'modules/examinations/views/edit-examination.client.view.html',
            action: 'edit_examination',
            title:'Edit Examinations'
		});
	}
]);