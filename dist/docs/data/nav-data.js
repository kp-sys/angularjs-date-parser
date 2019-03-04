angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "kpDateParser",
        "type": "groups",
        "href": "api/kpDateParser/directive/kpDateParser",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/kpDateParser/directive",
            "navItems": [
              {
                "name": "kpDateParser",
                "type": "directive",
                "href": "api/kpDateParser/directive/kpDateParser"
              }
            ]
          },
          {
            "name": "provider",
            "type": "section",
            "href": "api/kpDateParser/provider",
            "navItems": [
              {
                "name": "dateParserServiceProvider",
                "type": "provider",
                "href": "api/kpDateParser/provider/dateParserServiceProvider"
              }
            ]
          },
          {
            "name": "service",
            "type": "section",
            "href": "api/kpDateParser/service",
            "navItems": [
              {
                "name": "dateParserService",
                "type": "service",
                "href": "api/kpDateParser/service/dateParserService"
              }
            ]
          }
        ]
      }
    ]
  }
});
