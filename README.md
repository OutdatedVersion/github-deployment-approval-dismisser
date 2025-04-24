# GitHub "Deployment approval" dismissal script

This is a [Tampermonkey](https://www.tampermonkey.net/) user script which dismisses
notifications sent from GitHub Environment's ["Required reviewers"](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/reviewing-deployments) feature:

!["approval requested" notification](docs/assets/notification.png)

Once the notifications page (https://github.com/notifications) loads, the script
will select the relevant visible notifications then dismiss them as a batch. If you
have many pages of these, you'll need to refresh the page to trigger the script again.

There is an [open discussion](https://github.com/orgs/community/discussions/14564) with GitHub to natively support silencing these notifications though it's been lingering for a while.
