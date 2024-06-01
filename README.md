Tungsten Craft 5 Base
=====================

Starter template for Tungsten website projects built on Craft CMS 5.x

## Craft development docs

* [Craft Workflows](https://www.notion.so/Craft-Workflow-ATOM-toolbelt-cc430b0132c9455b83d2fed523ed6baf) (Start new website project, Join existing website project, On-going work on a website project, Gulp workflow, Deploy a website project to Live and Beta)
* [Changelog](CHANGELOG.md)

## Craft 5 Base Version development workflow

### Starting new Craft 5 Base version

1. Create a new Milestone in GitHub for Craft 5 Base version
2. Add Tasks for the version

### Completing Craft 5 Base version tasks

The majority of work will be done in **develop** branch created from the **master** branch when the work on a new Base Craft version starts.

    git checkout master
    git checkout -b develop
    git push -u origin develop

Each developer will pull the **develop** branch and use it to create local **topic** branches. These can be based on tasks created in the project.

    git pull
    git checkout develop
    git checkout -b my-local-branch

The work done in the topic branch will be local to the developer's computer. If the progress needs to be reviewed or collaboration with other developers is required, the developer can push the topic branch remotely:

    git push -u origin my-local-branch

This will create the remote branch _my-local-branch_ and automatically set the developer's local branch to track the remote, so he can pull changes from other developers working on that branch.

When the work on the topic branch is completed, the project task is moved to ... and the topic branch will be merged into **develop** branch:

    git checkout develop
    git pull
    git merge my-local-branch
    git push

At that point, the local topic branch and remote topic branch should to be deleted:

    git branch -d my-local-branch
    git push origin :my-local-branch

Continue the process by merging and pushing the **develop** branch.

### Finalizing new Craft 5 Base version

When the new Craft 5 Base version development is complete, follow these steps:

Merge the **develop** branch back into **master** branch

    git checkout master
    git merge develop

Delete the local and remote **develop** branch

    git branch -d develop
    git push origin :develop

Update the **CHANGELOG** with the newly added, changed, fixed functionality

Push the **master** branch

Go to [GitHub and create a release](https://github.com/ohlincik/craft5-base/releases) for the new Craft 5 Base version
