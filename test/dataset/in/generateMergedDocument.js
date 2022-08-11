const noDocObjects = {
  docObjects: [],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const noDocObjectsWithSource = {
  docObjects: [
    {
      abstract: {
        en: 'abstract.custom.en',
        fr: 'abstract.custom.fr',
      },
      authors: [
        'authors.custom.1',
        'authors.custom.2',
      ],
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const noDocObjectsWithKnownSource = {
  docObjects: [
    {
      abstract: {
        en: 'abstract.custom.en',
        fr: 'abstract.custom.fr',
      },
      authors: [
        'authors.custom.1',
        'authors.custom.2',
      ],
      source: 'custom',
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const noPriorities = {
  docObjects: [
    {
      abstract: {
        en: 'abstract.hal.en',
        fr: 'abstract.hal.fr',
      },
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      business: {
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      source: 'crossref',
    },
    {
      abstract: {
        en: 'abstract.pubmed.en',
        fr: 'abstract.pubmed.fr',
      },
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      source: 'pubmed',
    },
    {
      abstract: {
        en: 'abstract.sudoc.en',
        fr: 'abstract.sudoc.fr',
      },
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      source: 'sudoc',
    },
  ],
  rules: {
    priorities: [],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const globalPriorities = {
  docObjects: [
    {
      abstract: {
        en: 'abstract.hal.en',
        fr: 'abstract.hal.fr',
      },
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      business: {
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      source: 'crossref',
    },
    {
      abstract: {
        en: 'abstract.pubmed.en',
        fr: 'abstract.pubmed.fr',
      },
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      source: 'pubmed',
    },
    {
      abstract: {
        en: 'abstract.sudoc.en',
        fr: 'abstract.sudoc.fr',
      },
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      source: 'sudoc',
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [],
      'abstract.fr': [],
      authors: [],
    },
  },
};

const globalAndCustomPriorities = {
  docObjects: [
    {
      abstract: {
        en: 'abstract.hal.en',
        fr: 'abstract.hal.fr',
      },
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      business: {
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      source: 'crossref',
    },
    {
      abstract: {
        en: 'abstract.pubmed.en',
        fr: 'abstract.pubmed.fr',
      },
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      source: 'pubmed',
    },
    {
      abstract: {
        en: 'abstract.sudoc.en',
        fr: 'abstract.sudoc.fr',
      },
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      source: 'sudoc',
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const globalAndCustomPrioritiesButNoData = {
  docObjects: [
    {
      abstract: {
        en: 'abstract.hal.en',
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      source: 'crossref',
    },
    {
      abstract: {
        en: 'abstract.pubmed.en',
        fr: 'abstract.pubmed.fr',
      },
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      source: 'pubmed',
    },
    {
      abstract: {
        en: 'abstract.sudoc.en',
        fr: 'abstract.sudoc.fr',
      },
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      source: 'sudoc',
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const globalPrioritiesAndDeleteUnwantedData = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.hal.en',
        fr: 'abstract.hal.fr',
      },
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      source: 'hal',
    },
  ],
  rules: {
    priorities: [
      'hal',
      'crossref',
      'pubmed',
      'sudoc',
    ],
    keys: {
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      authors: [],
    },
  },
};

const defaultPrioritiesAndHalWithoutFulltext = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        hasFulltext: false,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        hasFulltext: false,
      },
      source: 'crossref',
    },
  ],
};

const defaultPrioritiesAndHalWithFulltext = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        hasFulltext: false,
      },
      source: 'crossref',
    },
  ],
};

const mergeDuplicates = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        duplicates: [
          {
            source: 'crossref',
            sourceUid: 'crossref:crossref1',
          },
        ],
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            source: 'hal',
            sourceUid: 'hal:hal1',
          },
        ],
      },
      source: 'crossref',
    },
  ],
};

const mergeDuplicatesWithOneEmptyDuplicate = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        duplicates: [
          {
            source: 'crossref',
            sourceUid: 'crossref:crossref1',
          },
        ],
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            source: 'hal',
            sourceUid: 'hal:hal1',
          },
        ],
      },
      source: 'crossref',
    },
    {
      abstract: {},
      authors: [],
      duplicates: [],
      source: 'sudoc',
    },
  ],
};

const mergeDuplicatesWithSameDuplicates = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        duplicates: [
          {
            source: 'sudoc',
            sourceUid: 'sudoc:sudoc1',
          },
        ],
        hasFulltext: true,
      },
      source: 'hal',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            source: 'sudoc',
            sourceUid: 'sudoc:sudoc1',
          },
        ],
        hasFulltext: false,
      },
      source: 'crossref',
    },
  ],
};

const mergeSourceUid = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        duplicates: [
          {
            source: 'crossref',
            sourceUid: 'crossref:crossref1',
          },
        ],
        hasFulltext: true,
      },
      source: 'hal',
      sourceUid: 'hal:hal1',
    },
    {
      abstract: {
        en: 'abstract.crossref.en',
        fr: 'abstract.crossref.fr',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            source: 'hal',
            sourceUid: 'hal:hal1',
          },
        ],
      },
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const mergeSourceUidButSameSourceUid = {
  docObjects: [
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        duplicates: [
          {
            source: 'crossref',
            sourceUid: 'crossref:crossref1',
          },
        ],
        hasFulltext: true,
      },
      source: 'hal',
      sourceUid: 'hal:hal1',
    },
    {
      abstract: {
        fr: 'abstract.hal.fr',
      },
      authors: [],
      business: {
        duplicates: [
          {
            source: 'crossref',
            sourceUid: 'crossref:crossref1',
          },
        ],
        hasFulltext: true,
      },
      source: 'hal',
      sourceUid: 'hal:hal1',
    },
    {
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            source: 'hal',
            sourceUid: 'hal:hal1',
          },
        ],
      },
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const mergeEnrichments = {
  docObjects: [
    {
      enrichments: {
        classifications: {
          scienceMetrix: [
            {
              label: 'hal',
              level: 1,
            },
          ],
          scopus: [
            {
              label: 'hal',
              level: 1,
            },
          ],
        },
        openAccess: {
          unpaywall: ['hal'],
        },
      },
      source: 'hal',
      sourceUid: 'hal:hal1',
    },
    {
      enrichments: {
        classifications: {
          scienceMetrix: [
            {
              label: 'crossref',
              level: 1,
            },
          ],
          scopus: [
            {
              label: 'crossref',
              level: 1,
            },
          ],
        },
        openAccess: {
          unpaywall: ['crossref'],
        },
      },
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const mergeKeywords = {
  docObjects: [
    {
      enrichments: {
        openAccess: {
          unpaywall: ['hal'],
        },
      },
      keywords: {
        fr: {
          author: ['test1', 'test2'],
        },
      },
      source: 'hal',
      sourceUid: 'hal:hal1',
    },
    {
      enrichments: {
        openAccess: {
          unpaywall: ['crossref'],
        },
      },
      keywords: {
        fr: {
          author: ['test2', 'test3'],
        },
      },
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const mergeOrcId = {
  docObjects: [
    {
      authors: [
        {
          forename: 'Gérard ',
          surname: ' André',
        },
        {
          forename: ' Lea',
          orcId: '0000-0003-4093-3000',
          surname: 'De Marche ',
        },
        {
          forename: 'Charles',
        },
      ],
      source: 'pubmed',
      sourceUid: 'pubmed:pubmed1',
    },
    {
      authors: [
        {
          enrichments: {
            orcId: '0000-0003-3946-1982',
          },
          forename: ' Gerard',
          surname: 'Andre ',
        },
        {
          forename: 'Léa ',
          surname: ' De Marché',
        },
        {
          forename: 'Charles',
          orcId: '0000-0003-4236-2015',
          surname: 'Attend',
        },
      ],
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const mergeRnsr = {
  docObjects: [
    {
      authors: [
        {
          affiliations: [
            {
              enrichments: {
                rnsr: ['200412801C'],
              },
              rnsr: [
                '200412801A',
                '200412801B',
              ],
            },
          ],
          forename: 'Gérard',
          surname: 'André',
        },
        {
          affiliations: [],
          forename: ' Lea',
          surname: 'De Marche ',
        },
        {
          forename: 'Charles',
        },
      ],
      source: 'pubmed',
      sourceUid: 'pubmed:pubmed1',
    },
    {
      authors: [
        {
          affiliations: [
            {
              rnsr: [
                '200412801A',
                '200412801D',
              ],
            },
            {
              enrichments: {
                rnsr: [
                  '198822446B',
                  '198822446C',
                ],
              },
              rnsr: ['198822446A'],
            },
          ],
          forename: 'Gerard',
          surname: 'Andre',
        },
        {
          affiliations: [
            {
              enrichments: {
                rnsr: ['198912571B'],
              },
              rnsr: ['198912571A'],
            },
          ],
          forename: 'Léa',
          surname: 'De Marché',
        },
        {
          affiliations: [
            {
              rnsr: ['RNSR-LOST'],
            },
          ],
          forename: 'Charles',
          surname: 'Attend',
        },
      ],
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const mergeAuthors = {
  docObjects: [
    {
      authors: [
        {
          forename: 'Gérard',
          surname: 'André',
        },
      ],
      source: 'pubmed',
      sourceUid: 'pubmed:pubmed1',
    },
    {
      authors: [
        {
          forename: 'Gerard',
          surname: 'Andre',
        },
        {
          affiliations: [],
          forename: '',
          fullname: '',
          halAuthorId: [],
          idHal: [],
          idRef: [],
          isni: [],
          orcId: [],
          researcherId: [],
          surname: '',
          viaf: [],
        },
      ],
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

const identifiers = {
  docObjects: [
    {
      host: {
        issn: 'pubmedIssn',
        eisbn: 'pubmedEissn',
        publisher: 'pubmedPublisher',
      },
      source: 'pubmed',
      sourceUid: 'pubmed:pubmed1',
    },
    {
      host: {
        issn: 'crossrefIssn',
        eisbn: 'crossrefEissn',
        publisher: 'crossrefPublisher',
      },
      source: 'crossref',
      sourceUid: 'crossref:crossref1',
    },
  ],
};

module.exports = {
  noDocObjects,
  noDocObjectsWithSource,
  noDocObjectsWithKnownSource,
  noPriorities,
  globalPriorities,
  globalAndCustomPriorities,
  globalAndCustomPrioritiesButNoData,
  globalPrioritiesAndDeleteUnwantedData,
  defaultPrioritiesAndHalWithoutFulltext,
  defaultPrioritiesAndHalWithFulltext,
  mergeDuplicates,
  mergeDuplicatesWithOneEmptyDuplicate,
  mergeDuplicatesWithSameDuplicates,
  mergeSourceUid,
  mergeSourceUidButSameSourceUid,
  mergeEnrichments,
  mergeKeywords,
  mergeOrcId,
  mergeRnsr,
  mergeAuthors,
  identifiers,
};
