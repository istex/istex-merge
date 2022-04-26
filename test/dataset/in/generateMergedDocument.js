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
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const noDocObjectsWithSource = {
  docObjects: [
    {
      authors: [
        'authors.custom.1',
        'authors.custom.2',
      ],
      abstract: {
        fr: 'abstract.custom.fr',
        en: 'abstract.custom.en',
      },
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
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const noDocObjectsWithKnownSource = {
  docObjects: [
    {
      source: 'custom',
      authors: [
        'authors.custom.1',
        'authors.custom.2',
      ],
      abstract: {
        fr: 'abstract.custom.fr',
        en: 'abstract.custom.en',
      },
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
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const noPriorities = {
  docObjects: [
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
      business: {
        hasFulltext: true,
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
    },
  ],
  rules: {
    priorities: [],
    keys: {
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const globalPriorities = {
  docObjects: [
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
      business: {
        hasFulltext: true,
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
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
      authors: [],
      'abstract.fr': [],
      'abstract.en': [],
    },
  },
};

const globalAndCustomPriorities = {
  docObjects: [
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
      business: {
        hasFulltext: true,
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
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
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const globalAndCustomPrioritiesButNoData = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
      business: {
        hasFulltext: true,
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'pubmed',
      authors: [
        'authors.pubmed.1',
        'authors.pubmed.2',
      ],
      abstract: {
        fr: 'abstract.pubmed.fr',
        en: 'abstract.pubmed.en',
      },
    },
    {
      source: 'sudoc',
      authors: [
        'authors.sudoc.1',
        'authors.sudoc.2',
      ],
      abstract: {
        fr: 'abstract.sudoc.fr',
        en: 'abstract.sudoc.en',
      },
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
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const globalPrioritiesAndDeleteUnwantedData = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      source: 'hal',
      authors: [
        'authors.hal.1',
        'authors.hal.2',
      ],
      abstract: {
        fr: 'abstract.hal.fr',
        en: 'abstract.hal.en',
      },
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
      authors: [],
      'abstract.fr': [
        'crossref',
        'pubmed',
        'sudoc',
      ],
      'abstract.en': [
        'pubmed',
        'sudoc',
      ],
    },
  },
};

const defaultPrioritiesAndHalWithoutFulltext = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      business: {
        hasFulltext: false,
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
};

const defaultPrioritiesAndHalWithFulltext = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      abstract: {
        fr: 'abstract.hal.fr',
      },
      business: {
        hasFulltext: true,
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
};

const mergeDuplicates = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      business: {
        hasFulltext: true,
        duplicates: [
          {
            sourceUid: 'crossref:crossref1',
            source: 'crossref',
          },
        ],
      },
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            sourceUid: 'hal:hal1',
            source: 'hal',
          },
        ],
      },
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
};

const mergeDuplicatesWithOneEmptyDuplicate = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      business: {
        hasFulltext: true,
        duplicates: [
          {
            sourceUid: 'crossref:crossref1',
            source: 'crossref',
          },
        ],
      },
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            sourceUid: 'hal:hal1',
            source: 'hal',
          },
        ],
      },
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
    {
      source: 'sudoc',
      authors: [],
      duplicates: [],
      abstract: {},
    },
  ],
};

const mergeDuplicatesWithSameDuplicates = {
  docObjects: [
    {
      source: 'hal',
      authors: [],
      business: {
        hasFulltext: true,
        duplicates: [
          {
            sourceUid: 'sudoc:sudoc1',
            source: 'sudoc',
          },
        ],
      },
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            sourceUid: 'sudoc:sudoc1',
            source: 'sudoc',
          },
        ],
      },
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
};

const mergeSourceUid = {
  docObjects: [
    {
      sourceUid: 'hal:hal1',
      source: 'hal',
      authors: [],
      business: {
        hasFulltext: true,
        duplicates: [
          {
            sourceUid: 'crossref:crossref1',
            source: 'crossref',
          },
        ],
      },
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            sourceUid: 'hal:hal1',
            source: 'hal',
          },
        ],
      },
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
};

const mergeSourceUidButSameSourceUid = {
  docObjects: [
    {
      sourceUid: 'hal:hal1',
      source: 'hal',
      authors: [],
      business: {
        hasFulltext: true,
        duplicates: [
          {
            sourceUid: 'crossref:crossref1',
            source: 'crossref',
          },
        ],
      },
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      sourceUid: 'hal:hal1',
      source: 'hal',
      authors: [],
      business: {
        hasFulltext: true,
        duplicates: [
          {
            sourceUid: 'crossref:crossref1',
            source: 'crossref',
          },
        ],
      },
      abstract: {
        fr: 'abstract.hal.fr',
      },
    },
    {
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        'authors.crossref.1',
        'authors.crossref.2',
      ],
      business: {
        duplicates: [
          {
            sourceUid: 'hal:hal1',
            source: 'hal',
          },
        ],
      },
      abstract: {
        fr: 'abstract.crossref.fr',
        en: 'abstract.crossref.en',
      },
    },
  ],
};

const mergeEnrichments = {
  docObjects: [
    {
      sourceUid: 'hal:hal1',
      source: 'hal',
      enrichments: {
        oa: {
          unpaywall: ['hal'],
          core: ['hal'],
        },
        classifications: {
          scopus: [
            {
              level: 1,
              label: 'hal',
            },
          ],
          scienceMetrix: [
            {
              level: 1,
              label: 'hal',
            },
          ],
        },
      },
    },
    {
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      enrichments: {
        oa: {
          unpaywall: [
            'crossref',
          ],
          core: [
            'crossref',
          ],
        },
        classifications: {
          scopus: [
            {
              level: 1,
              label: 'crossref',
            },
          ],
          scienceMetrix: [
            {
              level: 1,
              label: 'crossref',
            },
          ],
        },
      },
    },
  ],
};

const mergeKeywords = {
  docObjects: [
    {
      sourceUid: 'hal:hal1',
      source: 'hal',
      enrichments: {
        oa: {
          unpaywall: ['hal'],
          core: ['hal'],
        },
      },
      keywords: {
        fr: {
          author: ['test1', 'test2'],
        },
      },
    },
    {
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      enrichments: {
        oa: {
          unpaywall: ['crossref'],
          core: ['crossref'],
        },
      },
      keywords: {
        fr: {
          author: ['test2', 'test3'],
        },
      },
    },
  ],
};

const mergeOrcId = {
  docObjects: [
    {
      sourceUid: 'pubmed:pubmed1',
      source: 'pubmed',
      authors: [
        {
          forename: 'Gérard ',
          surname: ' André',
        },
        {
          forename: ' Lea',
          surname: 'De Marche ',
          orcId: '0000-0003-4093-3000',
        },
        {
          forename: 'Charles',
        },
      ],
    },
    {
      sourceUid: 'crossref:crossref1',
      source: 'crossref',
      authors: [
        {
          forename: ' Gerard',
          surname: 'Andre ',
          enrichments: {
            orcId: '0000-0003-3946-1982',
          },
        },
        {
          forename: 'Léa ',
          surname: ' De Marché',
        },
        {
          forename: 'Charles',
          surname: 'Attend',
          orcId: '0000-0003-4236-2015',
        },
      ],
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
};
