# istex-merge
Library to build merged documents and generate Hal TEIs from them.


## Table of Contents
- [Install](#install)
- [generateMergedDocument](#generatemergeddocument)
  - [Prerequisites](#prerequisites)
    - [Mapping](#mapping)
    - [Rules](#rules)
  - [Usage](#usage)
  - [Example](#example)
- [generateHalTEI](#generatehaltei)
  - [Prerequisites](#prerequisites-1)
  - [Usage](#usage-1)

## Install
```
npm install @istex/istex-merge
```

## generateMergedDocument
Function to create a merged document from multiple documents with a set of rules.

### Prerequisites

#### Mapping
A mapping example can be found [here](./mapping/default.json).

This JSON file's structure is as follows:
```JSON
{
  "corpusName": true,
  "source": true,
  "sourceId": false,
  "sourceUid": {
    "action": "merge",
    "path": "sourceUids"
  },
  // ...
  "title.default": true,
  "title.en": true,
  "title.fr": true,
  "utKey": false,
  // ...
  "_business.duplicates": {
    "action": "merge",
    "id": "sourceUid"
  },
  // ...
  "_business.hasFulltext": false,
  "fulltextUrl": true
}
```
This file describes the fields that will be present in the generated merged document.

The default mapping is exported, which means you can build your own mapping from it without having to recreate everything. This can be done like so:
```JS
const { defaultMapping } = require('@istex/istex-merge');

// default: true
defaultMapping.authors = false;
```

**Note**:
`istex-merge` can merge data coming from all sources. The two possible scenarios are:
- Fields with a simple value (like a string): you can specify a path to where the merged data will be in the final object. In the example above, the `sourceUid` field is merged and placed into `sourceUids` (we make it plurial because the value becomes an array).
- Fields with an array value (like `_business.duplicates`): a property (`sourceUid` in the example above) must be used to discriminate the values and remove potential duplicates if the values are objects.


#### Rules
An example file describing the priority rules can be found [here](./rules/default.json).

This JSON file's structure is as follows:
```JSON
{
  "priorities": [
    "hal",
    "crossref",
    "pubmed",
    "sudoc"
  ],
  "keys": {
    "corpusName": [/*...*/],
    "source": [/*...*/],
    "sourceId": [/*...*/],
    "sourceUid": [/*...*/],
    // ...
    "title.default": [/*...*/],
    "title.fr": [/*...*/],
    "title.en": [/*...*/],
    "utKey": [/*...*/],
    // ...
    "_business.hasFulltext": [/*...*/],
    "fulltextUrl": [/*...*/]
  }
}
```

The priority mechanism:
- `priorities` defines the default priority order. It is applied to every field without a specific priority order.
- `keys.<field>` defines a specific priority order for `<field>`. Use an empty array (`[]`) to tell `istex-merge` to use the default priority order.

The default rules are exported, which means you can build your own rules from them without having to recreate everything. This can be done like so:
```JS
const { defaultRules } = require('@istex/istex-merge');

// default: ['sudoc-theses', 'sudoc-ouvrages', 'hal', 'pubmed', 'crossref']
defaultRules.keys.abstract = ['pubmed', 'crossref', 'hal'];
```

### Usage
This library must be integrated in an environment with direct access to the `docObject`s.
```JS
const { generateMergedDocument, defaultRules, defaultMapping } = require('@istex/istex-merge');
const docObjects = [{...}, {...}, {...}];

defaultRules.keys.abstract = ['pubmed', 'crossref', 'hal'];

defaultMapping.authors = false;

const mergedDocument = generateMergedDocument(docObjects, { rules: defaultRules, mapping: defaultMapping });
```

### Example
Considering the following list of documents:
```JSON
[
  {
    "source": "hal",
    "authors": [],
    "abstract": {
      "fr": "abstract.hal.fr",
      "en": "abstract.hal.en"
    }
  },
  {
    "source": "crossref",
    "authors": [
      "authors.crossref.1",
      "authors.crossref.2"
    ],
    "abstract": {
      "fr": "abstract.crossref.fr",
      "en": "abstract.crossref.en"
    }
  },
  {
    "source": "pubmed",
    "authors": [
      "authors.pubmed.1",
      "authors.pubmed.2"
    ],
    "abstract": {
      "fr": "abstract.pubmed.fr",
      "en": "abstract.pubmed.en"
    }
  },
  {
    "source": "sudoc",
    "authors": [
      "authors.sudoc.1",
      "authors.sudoc.2"
    ],
    "abstract": {
      "fr": "abstract.sudoc.fr",
      "en": "abstract.sudoc.en"
    }
  }
]
```
**Note: The `docObject`s used to create the merged document MUST contain a `source` field.**

I want to build a merged document according to the following rules:
- By default, use data coming from "hal", then "crossref", then "pubmed" and finally "sudoc".
- For `abstract.fr`, use data coming from "crossref", then "pubmed" and finally "sudoc".
- For `abstract.en`, use data coming from "pubmed", then "sudoc".

I, thus, use the following JSON file:
```JSON
{
  "priorities": [
    "hal",
    "crossref",
    "pubmed",
    "sudoc"
  ],
  "keys": {
    "authors": [],
    "abstract.fr": [
      "crossref",
      "pubmed",
      "sudoc",
      "hal"
    ],
    "abstract.en": [
      "pubmed",
      "sudoc",
      "crossref",
      "hal"
    ]
  }
}
```

Which will give me the following result:
```JSON
{
  "source": "hal",
  "authors": [
    "authors.crossref.1",
    "authors.crossref.2"
  ],
  "abstract": {
    "fr": "abstract.crossref.fr",
    "en": "abstract.pubmed.en"
  },
  "origins": {
    "authors": "crossref",
    "abstract.fr": "crossref",
    "abstract.en": "pubmed",
    "sources": [
      "hal",
      "crossref",
      "pubmed"
    ]
  }
}
```

Description:
- `source`: the base source
- `origins.<field>`: the source that was modified by `istex-merge` for `<field>`
- `origins.sources`: an array compiling all the sources used in the merged document
- If the source on top of the priority list has no data for a field (in our example, the prioritized source (hal) has no `authors`), `istex-merge` will go down the priority list until it finds a source with data for this field.

## generateHalTEI
Function to generate a Hal TEI from a merged document.

### Prerequisites
Generate a merged document using the [generateMergedDocument function](#generatemergeddocument).

### Usage
```JS
const { generateMergedDocument, generateHalTEI } = require('@istex/istex-merge');
const docObjects = [{...}, {...}, {...}];

const mergedDocument = generateMergedDocument(docObjects);

const halTEIAsString = generateHalTEI(mergedDocument);
```

You can also pass an `options` object to `generateHalTEI`. This object is passed as is to [xmlbuilder2](https://oozcitak.github.io/xmlbuilder2/) (the XML builder used by `istex-merge`). You can find all the available options [here](https://oozcitak.github.io/xmlbuilder2/serialization.html#serialization-settings).
For example, you can use this `options` object to pretty print the TEI like so:
```JS
const prettyPrintedTEI = generateHalTEI(mergedDocument, { prettyPrint: true });
```
