---
title: Publish a jar file as private GitHub Package
date: 2022-10-07
categories: [development]
tags: [java, github, maven]
---


Sometimes you may need to publish a jar for your JVM based library to be used by other projects, but you need to keep it private to your organization. You can still do it as GitHub Package for free, and here is how.

In case you are one of those who prefer to see the code, here is a small [GitHub repo](https://github.com/amarinkovic/my-lib) used as an example in the rest of this write up.

Every GitHub project may have a corresponding artifact repository. Pretty much all the modern artifact types are supported, be it Docker images, npm modules or jar artifacts for Maven and Gradle based builds. Here I will assume that your project is using Maven.

First thing you need to make sure, is to specify a repository to which you will publish your artifact. This is done in the `DependencyManagement` section of your library's `pom.xml` by aspecifying the URL to your repo prefixed by `maven.pkg`. Here is an example how that looks like:

```xml
  <distributionManagement>
    <repository>
      <id>github</id>
      <name>GitHub Packages</name>
      <url>https://maven.pkg.github.com/amarinkovic/my-lib</url>
    </repository>
  </distributionManagement>
```

The above is pretty much the most important part, but there are still a few more pieces to this puzzle.

To make sure you are able to actually publish this artifact, you have to have the appropriate permissions on said repository. You will need to define a Personal Access Token (PAT). Github has great [documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) on how to do that, but it boils down to going to your _Settings > Developer setting > Personal access tokens_ and generating a token having the following two scopes:

- write:package
- read:package

Every library defines it's basic coordinates in `pom.xml` file. Those will be used by other projects to include it as a dependency. Normally you run `mvn clean install` to build your project and you get the jar file under project `target` folder. To be able to use it in other projects, by simpy making it a dependency, you should be able to use `mvn deploy` and push your package to GitHub. This is all assuming you have specified the repository correctly and your PAT token is valid, of course.

Now when that is all done, you should be able to see your package, if you go to the Packages section in your repo. GitHub is kind enough to show you an example of how to import your package into another maven project:

```xml
<dependency>
  <groupId>io.mankea</groupId>
  <artifactId>my-lib</artifactId>
  <version>1.0.0</version>
</dependency>
```

However, to be able to pull this dependency in, you will also need to define this repo as a maven repository. Mind the `maven.pkg` prefix in the URL, very important!

```xml
    <repositories>
        <repository>
            <id>github</id>
            <name>GitHub Packages</name>
            <url>https://maven.pkg.github.com/amarinkovic/my-lib</url>
            <releases><enabled>true</enabled></releases>
            <snapshots><enabled>true</enabled></snapshots>
        </repository>
    </repositories>
```

Similarly, if you actually developed a maven plugin you define a plugin repository like this:

```xml
    <pluginRepositories>
        <pluginRepository>
            <id>github</id>
            <name>GitHub Packages</name>
            <url>https://maven.pkg.github.com/amarinkovic/my-maven-plugin</url>
            <releases><enabled>true</enabled></releases>
            <snapshots><enabled>true</enabled></snapshots>
        </pluginRepository>
    </pluginRepositories>
```

With all of that in place, as a consumer of this library, you need to be able to autheticate to it's repository. You do that usint your PAT token. Your token is not a project specific thing, it is related to you as a developer (or CI pipeline etc.). Normally this informaition is stored you Maven's global `settings.xml` file. On your local dev environment it's fine to paste the actual token into this file as it is not being versioned. In a CI pipeline you should inline those as repository secrets:

```xml
    <servers>
        <server>
            <id>github</id>
            <username>${env.GITHUB_USER}</username>
            <password>${env.GITHUB_TOKEN}</password>
        </server>
    </servers>
```

Usually this file is located in user home under `~/.m2/settings.xml`. For purposes of using it in a CI pipeline you can tell to Maven where to get this file using the `-gs` flag like:

```zsh
mvn -U clean install -gs deploy/settings.xml
```

And that is all there is to it! To summarize briefly in the end, make sure you have your PAT token and that it is setup in your `settings.xml`. Define a repo in dependency management with your project URL prefixed with `maven.pkg`. Use `mvn deploy` to push the package to the artifact repository. In your consumer project add `repository` definition and finally add your library as a dependency.

Some time ago this really helped me in a project I was working on, hopefully it could be useful to someone else as well.
