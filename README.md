# ACE GitHub Action
[Azure Cost Estimator (ACE)](https://github.com/TheCloudTheory/arm-estimator) GitHub Action for easy integration with your GitHub Action pipelines. 

## Supported ACE version
This GitHub Actions currently supports `1.5-beta1` release of ACE. Use tags to point to older versions.

## Supported runners
Currently this action support Linux runners only.

## Usage
ACE GitHub Action allows you to use the same set of options, which are available for the supported version of ACE. You can find the whole reference in the `action.yml` file in this repository.

### How to use
Below is a set of examples presenting how to use this GitHub Action with different parameters and options.

### Basic (ARM Template)
```
name: Test GitHub action

on: [workflow_dispatch]

jobs:
  test_github_action:
    runs-on: ubuntu-latest
    name: A job to test GitHub Action
    steps:
      - uses: actions/checkout@v3
      - name: Azure Login
        uses: Azure/login@v1.4.6
        with:
          creds: ${{ secrets.SP_CREDS }}
      - name: Run action for ARM Template
        uses: TheCloudTheory/azure-cost-estimator-action@0.0.15-preview
        with:
          template-file: 'ace-tests/templates/acr.json'
          subscription-id: '<subscription-id>'
          resource-group-name: '<resource-group-name>'
```

### Basic (Bicep)
```
name: Test GitHub action

on: [workflow_dispatch]

jobs:
  test_github_action:
    runs-on: ubuntu-latest
    name: A job to test GitHub Action
    steps:
      - uses: actions/checkout@v3
      - name: Azure Login
        uses: Azure/login@v1.4.6
        with:
          creds: ${{ secrets.SP_CREDS }}
      - name: Run action for Bicep
        uses: TheCloudTheory/azure-cost-estimator-action@0.0.15-preview
        with:
          template-file: 'ace-tests/templates/bicep.json'
          subscription-id: '<subscription-id>'
          resource-group-name: '<resource-group-name>'
```

### Pass inline parameters
```
name: Test GitHub action

on: [workflow_dispatch]

jobs:
  test_github_action:
    runs-on: ubuntu-latest
    name: A job to test GitHub Action
    steps:
      - uses: actions/checkout@v3
      - name: Azure Login
        uses: Azure/login@v1.4.6
        with:
          creds: ${{ secrets.SP_CREDS }}
      - name: Run action for inline parameters
        uses: TheCloudTheory/azure-cost-estimator-action@0.0.15-preview
        with:
          template-file: 'ace-tests/templates/acr.json'
          subscription-id: '<subscription-id>'
          resource-group-name: '<resource-group-name>'
          inline-parameters: '{"par1":"value1","par2":"value2"}'
```

### Remarks
As ACE requires authentication to your Azure subscription, the same is applicable for this GitHub Action. The intended way of obtaining access token is using `Azure/login` action before `TheCloudTheory/azure-cost-estimator-action` as presented above.

## Contributions
Contributions are more than welcome!
