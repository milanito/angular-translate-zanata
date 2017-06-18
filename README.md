# angular-translate-zanata

This is a custom loader for angular translate with zanata backend

> This project is originally based on [i18next-node-zanata-backend](https://bitbucket.org/tagoh/i18next-node-zanata-backend)

> **Warning :** This has only been tested in specific cases and might not suit everyone, do not hesitate to make a PR :)

## Usage

Install it using yarn or npm :

    $ yarn add angular-translate-loader-zanata
    $ npm install angular-translate-loader-zanata --save

Then in your angular project :

    ...
    import angularTranslateLoaderZanata from 'angular-translate-loader-zanata';

    angular.module('yourApp', [ ..., angularTranslateLoaderZanata ])
    ...
    .config(($translateProvider) => {
      ...
      $translateProvider.use('translateZanataLoader', options);
      ...
    })
    ...

## Options

The options are :

```
{
  // url to the Zanata server
  url: 'https://translate.zanata.org', (default to 'https://translate.zanata.org')

  // Username for Zanata
  username: 'username',

  // API key for Zanata
  apiKey: 'API key',

  // project name
  projectId: 'project id in zanata',

  // project version
  versionId: 'version',

  // document id
  docId: 'docId'
}
```

## Configure Zanata and make it run

In order to make it run, you need to enable CORS in your instance, add the following property :

    <property name="zanata.origin.whitelist" value="http://our-domain" />

It has been tested on zanata version `4.1.0` using the docker image. Please see the [repo](https://github.com/zanata/zanata-docker-files) for details.

Because Zanata does not support i18next JSON format ([yet](https://zanata.atlassian.net/browse/ZNTA-667) ?), the following i18next format :

```
{
  NAMESPACE: {
    key: 'value'
  }
}
```

Is obtained from a `po` file like this :

```
msgid="NAMESPACE##key"
msgstr="value"
```

Be careful we uploading your documents. One thing you could do is use the [gulp-angular-translate-extract](https://github.com/bcabanes/gulp-angular-translate-extract) module in combinaison with [i18next-conv](https://github.com/i18next/i18next-gettext-converter) to generate the `po` files.

## License

MIT
