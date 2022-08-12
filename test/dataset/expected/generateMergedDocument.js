const globalPriorities = {
  abstract: {
    en: 'abstract.hal.en',
    fr: 'abstract.hal.fr',
  },
  authors: [
    'authors.hal.1',
    'authors.hal.2',
  ],
  origins: {
    abstract: 'hal',
    'abstract.en': 'hal',
    'abstract.fr': 'hal',
    authors: 'hal',
    sources: ['hal'],
  },
};

const globalAndCustomPriorities = {
  abstract: {
    en: 'abstract.pubmed.en',
    fr: 'abstract.crossref.fr',
  },
  authors: [
    'authors.hal.1',
    'authors.hal.2',
  ],
  origins: {
    abstract: 'hal',
    'abstract.en': 'pubmed',
    'abstract.fr': 'crossref',
    authors: 'hal',
    sources: ['hal', 'pubmed', 'crossref'],
  },
};

const globalAndCustomPrioritiesButNoData = {
  abstract: {
    en: 'abstract.pubmed.en',
    fr: 'abstract.crossref.fr',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  origins: {
    abstract: 'hal',
    'abstract.en': 'pubmed',
    'abstract.fr': 'crossref',
    authors: 'crossref',
    sources: ['hal', 'pubmed', 'crossref'],
  },
};

const globalPrioritiesAndDeleteUnwantedData = {
  authors: [
    'authors.hal.1',
    'authors.hal.2',
  ],
  abstract: {
    en: 'abstract.hal.en',
    fr: 'abstract.hal.fr',
  },
  origins: {
    authors: 'hal',
    abstract: 'hal',
    'abstract.en': 'hal',
    'abstract.fr': 'hal',
    sources: ['hal'],
  },
};

const defaultPrioritiesAndHalWithoutFulltext = {
  abstract: {
    en: 'abstract.crossref.en',
    fr: 'abstract.crossref.fr',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  origins: {
    abstract: 'crossref',
    'abstract.en': 'crossref',
    'abstract.fr': 'crossref',
    authors: 'crossref',
    sources: ['crossref'],
  },
};

const defaultPrioritiesAndHalWithFulltext = {
  abstract: {
    en: 'abstract.crossref.en',
    fr: 'abstract.hal.fr',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  origins: {
    abstract: 'hal',
    'abstract.en': 'crossref',
    'abstract.fr': 'hal',
    authors: 'crossref',
    sources: ['hal', 'crossref'],
  },
};

const mergeDuplicates = {
  abstract: {
    en: 'abstract.crossref.en',
    fr: 'abstract.hal.fr',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  business: {
    duplicates: [
      {
        source: 'crossref',
        sourceUid: 'crossref:crossref1',
      },
      {
        source: 'hal',
        sourceUid: 'hal:hal1',
      },
    ],
  },
  origins: {
    abstract: 'hal',
    'abstract.en': 'crossref',
    'abstract.fr': 'hal',
    authors: 'crossref',
    'business.duplicates': ['hal', 'crossref'],
    sources: ['hal', 'crossref'],
  },
};

const mergeDuplicatesWithOneEmptyDuplicate = {
  abstract: {
    en: 'abstract.crossref.en',
    fr: 'abstract.hal.fr',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  business: {
    duplicates: [
      {
        source: 'crossref',
        sourceUid: 'crossref:crossref1',
      },
      {
        source: 'hal',
        sourceUid: 'hal:hal1',
      },
    ],
  },
  origins: {
    abstract: 'hal',
    'abstract.en': 'crossref',
    'abstract.fr': 'hal',
    authors: 'crossref',
    'business.duplicates': ['hal', 'crossref', 'sudoc'],
    sources: ['hal', 'crossref', 'sudoc'],
  },
};

const mergeDuplicatesWithSameDuplicates = {
  abstract: {
    en: 'abstract.crossref.en',
    fr: 'abstract.hal.fr',
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
  },
  origins: {
    abstract: 'hal',
    'abstract.en': 'crossref',
    'abstract.fr': 'hal',
    'business.duplicates': ['hal', 'crossref'],
    authors: 'crossref',
    sources: ['hal', 'crossref'],
  },
};

const mergeSourceUid = {
  abstract: {
    fr: 'abstract.hal.fr',
    en: 'abstract.crossref.en',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  business: {
    duplicates: [
      {
        source: 'crossref',
        sourceUid: 'crossref:crossref1',
      },
      {
        source: 'hal',
        sourceUid: 'hal:hal1',
      },
    ],
  },
  sourceUids: [
    'hal:hal1',
    'crossref:crossref1',
  ],
  origins: {
    abstract: 'hal',
    'abstract.en': 'crossref',
    'abstract.fr': 'hal',
    authors: 'crossref',
    'business.duplicates': ['hal', 'crossref'],
    sources: ['hal', 'crossref'],
    sourceUid: ['hal', 'crossref'],
  },
};

const mergeSourceUidButSameSourceUid = {
  abstract: {
    fr: 'abstract.hal.fr',
    en: 'abstract.crossref.en',
  },
  authors: [
    'authors.crossref.1',
    'authors.crossref.2',
  ],
  business: {
    duplicates: [
      {
        source: 'crossref',
        sourceUid: 'crossref:crossref1',
      },
      {
        source: 'hal',
        sourceUid: 'hal:hal1',
      },
    ],
  },
  sourceUids: [
    'hal:hal1',
    'crossref:crossref1',
  ],
  origins: {
    'business.duplicates': ['hal', 'crossref'],
    abstract: 'hal',
    'abstract.en': 'crossref',
    'abstract.fr': 'hal',
    authors: 'crossref',
    sources: ['hal', 'crossref'],
    sourceUid: ['hal', 'crossref'],
  },
};

const mergeEnrichments = {
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
  sourceUids: ['hal:hal1', 'crossref:crossref1'],
  origins: {
    enrichments: 'crossref',
    'enrichments.openAccess': 'crossref',
    'enrichments.openAccess.unpaywall': 'crossref',
    sources: ['hal', 'crossref'],
    sourceUid: ['hal', 'crossref'],
  },
};

const mergeKeywords = {
  enrichments: {
    openAccess: {
      unpaywall: ['crossref'],
    },
  },
  keywords: {
    fr: {
      author: ['test1', 'test2', 'test3'],
    },
  },
  sourceUids: ['hal:hal1', 'crossref:crossref1'],
  origins: {
    enrichments: 'crossref',
    'enrichments.openAccess': 'crossref',
    'enrichments.openAccess.unpaywall': 'crossref',
    keywords: 'crossref',
    'keywords.fr': 'crossref',
    'keywords.fr.author': ['hal', 'crossref'],
    sources: ['hal', 'crossref'],
    sourceUid: ['hal', 'crossref'],
  },
};

const mergeOrcId = {
  authors: [
    {
      forename: 'Gérard ',
      orcId: '0000-0003-3946-1982',
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
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  origins: {
    authors: 'pubmed',
    sources: ['pubmed', 'crossref'],
    sourceUid: ['pubmed', 'crossref'],
  },
};

const mergeRnsr = {
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
      rnsr: [
        '200412801A',
        '200412801B',
        '200412801C',
        '200412801D',
        '198822446A',
        '198822446B',
        '198822446C',
      ],
      surname: 'André',
    },
    {
      affiliations: [],
      forename: ' Lea',
      rnsr: [
        '198912571A',
        '198912571B',
      ],
      surname: 'De Marche ',
    },
    {
      forename: 'Charles',
    },
  ],
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  origins: {
    authors: 'pubmed',
    sources: ['pubmed', 'crossref'],
    sourceUid: ['pubmed', 'crossref'],
  },
};

const mergeAuthors = {
  authors: [
    {
      forename: 'Gérard',
      surname: 'André',
    },
  ],
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  origins: {
    authors: 'pubmed',
    sources: ['pubmed', 'crossref'],
    sourceUid: ['pubmed', 'crossref'],
  },
};

const identifiers = {
  host: {
    issn: 'crossrefIssn',
    eisbn: 'crossrefEissn',
    publisher: 'crossrefPublisher',
  },
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  origins: {
    host: 'pubmed',
    'host.issn': 'crossref',
    'host.eisbn': 'crossref',
    'host.publisher': 'crossref',
    sources: ['pubmed', 'crossref'],
    sourceUid: ['pubmed', 'crossref'],
  },
};

const missingSubfieldsInPrimarySource = {
  host: {
    subject: {
      lang: 'en',
    },
  },
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  origins: {
    host: 'pubmed',
    'host.subject': 'pubmed',
    sources: ['pubmed', 'crossref'],
    sourceUid: ['pubmed', 'crossref'],
  },
};

const business = {
  business: {
    authorsAddresses: ['pubmedAddress1'],
    authorsRnsr: ['rnsr1', 'rnsr2', 'rnsr3'],
    duplicateGenre: 'pubmedArticle',
    duplicateRules: ['pubmedRule1', 'pubmedRule2'],
    duplicates: [
      {
        source: 'crossref',
        sourceUid: 'crossref:crossref1',
      },
      {
        source: 'pubmed',
        sourceUid: 'pubmed:pubmed1',
      },
    ],
    pageRange: '1-10',
    sourceUidChain: 'pubmedSourceUidChain',
    xPublicationDate: '2022-08-12',
    xisbn: 'pubmedIsbn',
    xissn: 'pubmedIssn',
  },
  sourceUids: ['pubmed:pubmed1', 'crossref:crossref1'],
  origins: {
    'business.authorsAddresses': 'pubmed',
    'business.authorsRnsr': ['pubmed', 'crossref'],
    'business.duplicates': ['pubmed', 'crossref'],
    'business.duplicateGenre': 'pubmed',
    'business.duplicateRules': 'pubmed',
    'business.pageRange': 'pubmed',
    'business.sourceUidChain': 'pubmed',
    'business.xPublicationDate': 'pubmed',
    'business.xisbn': 'pubmed',
    'business.xissn': 'pubmed',
    sources: ['pubmed', 'crossref'],
    sourceUid: ['pubmed', 'crossref'],
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
  mergeRnsr,
  mergeAuthors,
  identifiers,
  missingSubfieldsInPrimarySource,
  business,
};
