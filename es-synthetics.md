__If you intend to run "Browser" monitors on this private location, please ensure you are using the elastic-agent-complete Docker container, which contains the dependencies to run these monitors.__

- Add Fleet policies
  Fleet > Agent policies > Create Agent Policy (exclude system log/metrics collection)
  - aks-05-aiops-browser-agent
  - aks-05-aiops-uptime-agent

- Add private locations (location has a policy) - [x](https://www.elastic.co/guide/en/observability/current/synthetics-private-location.html)
  1. Uptime App > Monitor Management > Private Locations
  2. Add locations and the policies with the same names:
    - aks-05-aiops-browser-agent


_Now you can add monitors to private location in the Uptime app or using the Elastic Synthetics library’s push method._

  5. Add monitor (HTTP, google-com, https://www.google.com, aks-05-aiops-uptime-agent)
  6. Add Browser script (aks-05-aiops-browser-agent)

# Create and run tests

So there are the following types of checks:
- Lightweight:
  - ICMP Monitors
  - TCP Monitors
  - HTTP Monitors
- Browser Monitors (Script-based)

- [ES: Synthetics Docs starting page](https://www.elastic.co/guide/en/observability/current/monitor-uptime-synthetics.html)
- [ES: Howto Configure indexes and HTTPS certs](https://www.elastic.co/guide/en/observability/current/configure-uptime-settings.html)
- [ES Lightweight Monitors](https://www.elastic.co/guide/en/observability/current/uptime-set-up.html)
- [ES Docs Browser Monitors](https://www.elastic.co/guide/en/observability/current/synthetics-journeys.html)

## 3 ways to setup lightweight monitors
- Hearbeat (lightweight daemon + yaml config file)
- Uptime app (UI based)
- Project Monitors (GitOps-like)

[ES Docs: 3 ways to setup](https://www.elastic.co/guide/en/observability/current/uptime-set-up.html)

**Project monitors (GitOps style) - code-based monitor that resides in expernal git and is pushed to Kibana to create monitors**

### Project Monitors
To create lightweight monitors using project monitors, you’ll configure monitors in an external Node.js project and use the @elastic/synthetics library’s push command to create monitors in Kibana.

## ES Synthetics resources

so there are 3 tools:
- PlayWright tesing framework
- @elastic/synthetics - used with heartbeat synthetics
- synthetics-recorder (beta)
  - [docs](https://www.elastic.co/guide/en/observability/current/synthetics-recorder.html)
  - [GH](https://github.com/elastic/synthetics-recorder)

@elastic/synthetics is similar to PlayWright, but you install and use them independently.

### Tool 2: ES Synthetics: synthetics-recorder
1. download dmg from GH releases and run to install in the Applications folder
2. enable the app to run from the mac Privacy and security

### Tool 3: ES Synthetics: @elastic/synthetics
- [es docs](https://www.elastic.co/guide/en/observability/master/synthetic-monitoring.html)

#### install ES synthetics package:
```
npm install @elastic/synthetics --save
```
#### execute elastic synthetics from CLI:
- see [docs](https://www.elastic.co/guide/en/observability/master/synthetics-command-reference.html)
```
npx @elastic/synthetics [options] [files] [dir]

### Execute script inline:
example: [x](https://www.elastic.co/guide/en/observability/master/synthetics-create-test.html)
```
cd /Users/kozlova/program/repos/kb-docs/es-stack/es-synthetics/sandbox
curl https://raw.githubusercontent.com/elastic/synthetics/master/examples/inline/short.js | npx @elastic/synthetics --inline
```

### Inline script - example
includes only steps and no other information:

- [x](https://github.com/elastic/synthetics-demo/blob/main/inline-examples/inline-example.ts)

```ts
step("load todos", async () => {
    await page.goto('https://elastic.github.io/synthetics-demo/');
});
step('assert title', async () => {
  const header = await page.$('h1');
  expect(await header.textContent()).toBe('todos');
});
```

### Journeys project - Complete example
- [x](https://github.com/alex-y-kozlov-sandbox/synthetics-demo-elk/tree/main/advanced-examples)

What's where:
- [synthetics.config.ts](https://github.com/alex-y-kozlov-sandbox/synthetics-demo-elk/blob/main/advanced-examples/synthetics.config.ts) file contains configuration for your project.
- [journeys](https://github.com/alex-y-kozlov-sandbox/synthetics-demo-elk/tree/main/advanced-examples/journeys) directory contains both basic and more advanced examples of using synthetics. It tests a publicly hosted Todos List.
- .github directory contains an example github action, demonstrating the use of a CI service for automatically running tests on merges and PR creation.

- NPX synthetics CLI reference: https://www.elastic.co/guide/en/observability/current/synthetics-command-reference.html

**npx @elastic/synthetics fails with self-signed cert, and has no -k flag**
Thus we use as starter samples from forked sample repo: https://github.com/alex-y-kozlov-sandbox/synthetics-demo-elk

- API Key from npx elastic: <TOKEN GOES HERE>
```
cd ./synthetics/advanced-examples
npx @elastic/synthetics journeys

npx @elastic/synthetics push --url <kibana-url> --auth <TOKEN GOES HERE>
```

### How to debug locally? - simple!
1. create directory <DIR>
2. copy package.json and package-lock.json from ./synthetics/advanced-examples to <DIR>
3. run nm install
4. mkdir <DIR>/journeys
5. copy your scripts into <DIR> (see example in the ./synthetics/advanced-examples/journeys)
6. from <DIR> folder run command:
```
npx @elastic/synthetics --no-headless --pattern journeys/*.js journeys
```
7. instead of running all js files with `--pattern journeys/*.js` you can run specific file(s) as needed - **A BUG: if only one file matches the pattern it is ignored - 'No tests found!'**; to work around, create an empty file that also matches a pattern then it will work.