import { po } from 'gettext-parser';
import {
  merge, join, forEach, split,
  set, first, isEmpty
} from 'lodash';

import opts from './config';

/* @ngInject */
function TranslateZanataLoader($http, $q) {
  /**
   * This function will fetch the translation
   * from a Zanata account using the API.
   * @param { Object } options The user's options
   * @return { Promise } A promise that resolves the
   * translation JSON or reject an error
   */
  return function load(options) {
    const deferred = $q.defer();
    const { url, projectId, key, docId, username, apiKey, versionId, path } = merge(opts, options);

    $http.get(join([
      url, path,
      projectId, versionId, key,
      'baked'
    ], '/'), {
      params: { docId },
      headers: {
        'X-Auth-User': username,
        'X-Auth-Token': apiKey,
      }
    })
      .then(({ data }) => po.parse(data))
      .then(({ translations }) => {
        const data = {};
        forEach(translations, value =>
          forEach(value, (item) => {
            const { msgid, msgstr } = item;
            const keys = join(split(msgid, '##'), '.');
            if (!isEmpty(keys)) {
              set(data, keys, first(msgstr));
            }
          }));
        return deferred.resolve(data);
      })
      .catch(err => deferred.reject(err));

    return deferred.promise;
  };
}

/**
 * This is the loader module
 */
export default angular.module('angularTranslateLoaderZanata', []) // eslint-disable-line
  .factory('translateZanataLoader', TranslateZanataLoader)
  .name;
