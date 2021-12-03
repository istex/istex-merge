const globalPriorities = {
  authors: ['authors.hal.1', 'authors.hal.2'],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.hal.en' },
  origins: {
    authors: 'hal',
    abstract: 'hal',
    'abstract.fr': 'hal',
    'abstract.en': 'hal',
    sources: ['hal'],
  },
};

const globalAndCustomPriorities = {
  authors: ['authors.hal.1', 'authors.hal.2'],
  abstract: { fr: 'abstract.crossref.fr', en: 'abstract.pubmed.en' },
  origins: {
    authors: 'hal',
    abstract: 'hal',
    'abstract.fr': 'crossref',
    'abstract.en': 'pubmed',
    sources: ['hal', 'crossref', 'pubmed'],
  },
};

const globalAndCustomPrioritiesButNoData = {
  abstract: { fr: 'abstract.crossref.fr', en: 'abstract.pubmed.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    abstract: 'hal',
    'abstract.fr': 'crossref',
    'abstract.en': 'pubmed',
    authors: 'crossref',
    sources: ['hal', 'crossref', 'pubmed'],
  },
};

const globalPrioritiesAndDeleteUnwantedData = {
  authors: ['authors.hal.1', 'authors.hal.2'],
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.hal.en' },
  origins: {
    authors: 'hal',
    abstract: 'hal',
    'abstract.fr': 'hal',
    'abstract.en': 'hal',
    sources: ['hal'],
  },
};

const defaultPrioritiesAndHalWithoutFulltext = {
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  abstract: { fr: 'abstract.crossref.fr', en: 'abstract.crossref.en' },
  origins: {
    authors: 'crossref',
    abstract: 'crossref',
    'abstract.fr': 'crossref',
    'abstract.en': 'crossref',
    sources: ['crossref'],
  },
};

const defaultPrioritiesAndHalWithFulltext = {
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    abstract: 'hal',
    'abstract.fr': 'hal',
    authors: 'crossref',
    'abstract.en': 'crossref',
    sources: ['hal', 'crossref'],
  },
};

const mergeDuplicates = {
  _business: {
    duplicates: [
      { source: 'crossref', sourceUid: 'crossref:crossref1' },
      { source: 'hal', sourceUid: 'hal:hal1' },
    ],
  },
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    '_business.duplicates': ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeDuplicatesWithOneEmptyDuplicate = {
  _business: {
    duplicates: [
      { source: 'crossref', sourceUid: 'crossref:crossref1' },
      { source: 'hal', sourceUid: 'hal:hal1' },
    ],
  },
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    '_business.duplicates': ['hal', 'crossref', 'sudoc'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref', 'sudoc'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeDuplicatesWithSameDuplicates = {
  _business: {
    duplicates: [
      { source: 'sudoc', sourceUid: 'sudoc:sudoc1' },
    ],
  },
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    '_business.duplicates': ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeSourceUid = {
  sourceUids: ['hal:hal1', 'crossref:crossref1'],
  _business: {
    duplicates: [
      { source: 'crossref', sourceUid: 'crossref:crossref1' },
      { source: 'hal', sourceUid: 'hal:hal1' },
    ],
  },
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    sourceUid: ['hal', 'crossref'],
    '_business.duplicates': ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeSourceUidButSameSourceUid = {
  sourceUids: ['hal:hal1', 'crossref:crossref1'],
  _business: {
    duplicates: [
      { source: 'crossref', sourceUid: 'crossref:crossref1' },
      { source: 'hal', sourceUid: 'hal:hal1' },
    ],
  },
  abstract: { fr: 'abstract.hal.fr', en: 'abstract.crossref.en' },
  authors: ['authors.crossref.1', 'authors.crossref.2'],
  origins: {
    sourceUid: ['hal', 'crossref'],
    '_business.duplicates': ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.fr': 'hal',
    sources: ['hal', 'crossref'],
    authors: 'crossref',
    'abstract.en': 'crossref',
  },
};

const mergeEnrichments = {
  sourceUids: ['hal:hal1', 'crossref:crossref1'],
  enrichments: {
    oa: {
      unpaywall: ['crossref'],
      core: ['crossref'],
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
  origins: {
    sourceUid: ['hal', 'crossref'],
    enrichments: 'crossref',
    sources: ['hal', 'crossref'],
  },
};

const mergeKeywords = {
  sourceUids: ['hal:hal1', 'crossref:crossref1'],
  enrichments: {
    oa: {
      unpaywall: ['crossref'],
      core: ['crossref'],
    },
  },
  keywords: {
    fr: {
      author: ['test1', 'test2', 'test3'],
    },
  },
  origins: {
    sourceUid: ['hal', 'crossref'],
    enrichments: 'crossref',
    'keywords.fr.author': ['hal', 'crossref'],
    sources: ['hal', 'crossref'],
  },
};

const mergeOrcId = {
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  authors: [
    {
      forename: 'Gérard ',
      surname: ' André',
      orcId: '0000-0003-3946-1982',
    },
    {
      forename: ' Lea',
      surname: 'De Marche ',
      orcId: '0000-0003-4093-3000',
    },
    { forename: 'Charles' },
  ],
  origins: {
    sourceUid: ['pubmed', 'crossref'],
    authors: 'pubmed',
    sources: ['pubmed', 'crossref'],
  },
};

module.exports = {
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
