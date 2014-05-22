/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.dashboard')
  .directive('dashboardLayouts', ['LayoutStorage', '$timeout', function(LayoutStorage, $timeout) {
    return {
      scope: true,
      templateUrl: 'template/dashboard-layouts.html',
      link: function(scope, element, attrs) {

        scope.options = scope.$eval(attrs.dashboardLayouts);

        var layoutStorage = new LayoutStorage(scope.options);

        scope.layouts = layoutStorage.layouts;

        scope.createNewLayout = function() {
          layoutStorage.add({ title: 'Custom', dashboard: { defaultWidgets: [] } });
        };

        scope.makeLayoutActive = function(layout) {
          angular.forEach(scope.layouts, function(l) {
            if (l !== layout) {
              l.active = false;
            } else {
              l.active = true;
            }
          });
          layoutStorage.save();
        };

        scope.isActive = function(layout) {
          return !! layout.active;
        };

        scope.editTitle = function (layout) {
          var input = element.find('input[data-layout="' + layout.id + '"]');
          layout.editingTitle = true;

          $timeout(function() {
            input.focus()[0].setSelectionRange(0, 9999);
          });
        };

        // saves whatever is in the title input as the new title
        scope.saveTitleEdit = function (layout) {
          layout.editingTitle = false;
          layoutStorage.save();
        };
      }
    };
  }]);