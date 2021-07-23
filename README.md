[default]: https://github.com/Readme-Workflows/readme-replacer/blob/main/src/replacers.json
[discord]: https://discord.gg/2a9VC4AK6x

# Readme-Replacer

Readme-Replacer is a GitHub Action that allows you define your own collections of placeholder text to replace with specific values.  
The Action is designed to be as flexible as possible and to work with other Actions.

## Setup

To Set up the Action, first create a new workflow file and populate it with the following values:  
```yaml
name: Replace placeholders

on:
  schedule:
    - cron: '*/30 * * * *' # Activate every 30 minutes
  workflow_dispatch: # Allow manual trigger

jobs:
  replace:
    runs-on: ubuntu-latest
    name: Replace Placeholders in File.
    
    steps:
      - uses: actions/checkout@v2
      - uses: Readme-Workflows/readme-replacer@v1.0.0
        env:
          GITHUB_TOKEN: {{ secrets.GITHUB_TOKEN }}
        with:
          # Those are all default values and only are shown for demonstration
          TEMPLATE_FILE: './TEMPLATE.md'
          COMMIT_FILE: './README.md'
          CUSTOM_REPLACER_FILE: './.github/customReplacer.json'
```

### Options

| Option                 | Function                                                                                           | Default                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `GH_USERNAME`          | Name of the user used.                                                                             | `Repository Owner`                                      |
| `TEMPLATE_FILE`        | The template MD file to get content from.                                                          | `./TEMPLATE.md`                                         |
| `COMMIT_FILE`          | The target MD file to update with the template.                                                    | `./README.md`                                           |
| `CUSTOM_REPLACER_FILE` | JSON file that contains the placeholders and their replacements.                                   | `./.github/customReplacer.json`                         |
| `DATE_FORMAT`          | Format used to display the date in.                                                                | `dddd, mmmm, dS, yyyy, h:MM:ss TT`                      |
| `TIMEZONE`             | Timezone to use for the date fomatting. Can be a relative GMT-time (i.e. `+2:00`) or Locale-based. | `0`                                                     |
| `COMMIT_MESSAGE`       | Message to use for the commit.                                                                     | `⚡ Update README by replacing keywords`                |
| `COMMIT_EMAIL`         | E-Mail used for the Committer.                                                                     | `41898282+github-actions[bot]@users.noreply.github.com` |
| `COMMIT_NAME`          | Name used for the Committer.                                                                       | `replacer-bot`                                          |

### Replacer JSON file

A key-feature of this Action is the ability to define your own placeholders and their replacement for it.  
This is done by creating and using a JSON file (Called `customReplacer.json` and located within the `.github` directory) and configuring it to have the right values.

The structure of the JSON file may look like this:  
```json
[
  {
    "search": "{foo}",
    "replace": "Bar",
    "eval": false
  }
]
```
Here is a quick rundown of the different options:

- `search` is the text that the Action should look for in the Template file. It can be any text you like.
- `replace` is the value that the `search` value should be replaced with. In our example above would any appearance of `{foo}` be replaced with `Bar`.
- `eval` is a boolean to set whether the `replace` value should be evaluated by the Action for further manipulation. It essentially allows you to set Javascript code that would be executed when the Action runs (i.e. `new Date().toLocaleString()` would be executed as Javascript code and the result used as replacement for the search string).

You can find a [JSON file][default] which would be the default placeholders in the workflow in this repository.

## Links

- [Discord]  
  Make sure to follow the `#news` channel for any updates towards this and any other Products of the Readme-Workflows Organisation!
