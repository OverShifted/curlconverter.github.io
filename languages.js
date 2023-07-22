import HTTPSnippet from 'httpsnippet'

import * as curlconverter from 'curlconverter'

function httpsnippet(title, lang, client, hljs) {
  lang = lang ? lang : title.toLowerCase()
  hljs = hljs ? hljs : lang
  const to = (curl) => {
    const [har, warnings] = curlconverter.toHarStringWarn(curl)
    const parsedHar = JSON.parse(har)
    warnings.push(['httpsnippet', title + ' code is generated by the httpsnippet library.'])
    if (parsedHar.log && parsedHar.log.entries && parsedHar.log.entries.some((e) => e.request && e.request.postData && e.request.postData.text)) {
      warnings.push(['httpsnippet-no-data', 'httpsnippet might ignore request data'])
    }
    let code = (new HTTPSnippet(parsedHar)).convert(lang, client)
    if (Array.isArray(code)) {
      // TODO: this doesn't work for JavaScript for example, because of const
      code = code.join('\n\n')
      warnings.push(['httpsnippet-multiple-requests', 'found multiple requests'])
    }
    return [code, warnings]
  }
  return { converter: to, hljs, title }
}

export const languages = {
  ansible: { converter: curlconverter.toAnsibleWarn, hljs: 'yaml', title: 'Ansible' },
  // backwards compatibility
  cfml: { converter: curlconverter.toCFMLWarn, hljs: 'javascript', title: 'ColdFusion Markup Language' },
  // TODO: CFML isn't supported by highlight.js
  coldfusion: { converter: curlconverter.toCFMLWarn, hljs: 'javascript', title: 'ColdFusion Markup Language' },
  csharp: { converter: curlconverter.toCSharpWarn, hljs: 'csharp', title: 'C# + HttpClient' },
  clojure: { converter: curlconverter.toClojureWarn, hljs: 'clojure', title: 'Clojure' },
  dart: { converter: curlconverter.toDartWarn, hljs: 'dart', title: 'Dart' },
  elixir: { converter: curlconverter.toElixirWarn, hljs: 'elixir', title: 'Elixir' },
  go: { converter: curlconverter.toGoWarn, hljs: 'go', title: 'Go' },
  har: { converter: curlconverter.toHarStringWarn, hljs: 'json', title: 'HAR' },
  http: { converter: curlconverter.toHTTPWarn, hljs: 'http', title: 'HTTP' },
  httpie: { converter: curlconverter.toHttpieWarn, hljs: 'bash', title: 'HTTPie' },
  java: { converter: curlconverter.toJavaWarn, hljs: 'java', title: 'Java + HttpClient' },
  'java-httpurlconnection': { converter: curlconverter.toJavaHttpUrlConnectionWarn, hljs: 'java', title: 'Java + HttpURLConnection' },
  'java-jsoup': { converter: curlconverter.toJavaJsoupWarn, hljs: 'java', title: 'Java + jsoup'},
  'java-okhttp': { converter: curlconverter.toJavaOkHttpWarn, hljs: 'java', title: 'Java + OkHttp'},
  javascript: { converter: curlconverter.toJavaScriptWarn, hljs: 'javascript', title: 'JavaScript + fetch' },
  'javascript-jquery': {converter: curlconverter.toJavaScriptJqueryWarn, hljs: 'javascript', title: 'JavaScript + jQuery'},
  'javascript-xhr': {converter: curlconverter.toJavaScriptXHRWarn, hljs: 'javascript', title: 'JavaScript + XHR'},
  // People googling for "curl json" are probably looking for something else
  json: { converter: curlconverter.toJsonStringWarn, hljs: 'json', title: 'a JSON object' },
  kotlin: { converter: curlconverter.toKotlinWarn, hljs: 'kotlin', title: 'Kotlin' },
  matlab: { converter: curlconverter.toMATLABWarn, hljs: 'matlab', title: 'MATLAB' },
  'node-fetch': { converter: curlconverter.toNodeWarn, hljs: 'javascript', title: 'node-fetch' },
  'node-http': { converter: curlconverter.toNodeHttpWarn, hljs: 'javascript', title: 'Node + http' },
  'node-axios': { converter: curlconverter.toNodeAxiosWarn, hljs: 'javascript', title: 'Node + Axios' },
  'node-got': { converter: curlconverter.toNodeGotWarn, hljs: 'javascript', title: 'Node + Got' },
  'node-ky': { converter: curlconverter.toNodeKyWarn, hljs: 'javascript', title: 'Node + Ky' },
  'node-request': { converter: curlconverter.toNodeRequestWarn, hljs: 'javascript', title: 'Node + request' },
  'node-superagent': { converter: curlconverter.toNodeSuperAgentWarn, hljs: 'javascript', title: 'Node + SuperAgent' },
  objectivec: httpsnippet('Objective-C', 'objc', 'nsurlsession', 'objectivec'),
  ocaml: { converter: curlconverter.toOCamlWarn, hljs: 'ocaml', title: 'OCaml' },
  php: { converter: curlconverter.toPhpWarn, hljs: 'php', title: 'PHP' },
  'php-guzzle': { converter: curlconverter.toPhpGuzzleWarn, hljs: 'php', title: 'PHP + Guzzle' },
  'powershell-restmethod': { converter: curlconverter.toPowershellRestMethodWarn, hljs: 'powershell', title: 'PowerShell + Invoke-RestMethod' },
  'powershell-webrequest': { converter: curlconverter.toPowershellWebRequestWarn, hljs: 'powershell', title: 'PowerShell + Invoke-WebRequest' },
  python: { converter: curlconverter.toPythonWarn, hljs: 'python', title: 'Python' },
  'python-httpclient': httpsnippet('Python + http.client', 'python', 'python3'),
  r: { converter: curlconverter.toRWarn, hljs: 'r', title: 'R' },
  ruby: { converter: curlconverter.toRubyWarn, hljs: 'ruby', title: 'Ruby' },
  rust: { converter: curlconverter.toRustWarn, hljs: 'rust', title: 'Rust' },
  swift: { converter: curlconverter.toSwiftWarn, hljs: 'swift', title: 'swift' },
  wget: { converter: curlconverter.toWgetWarn, hljs: 'bash', title: 'Wget' },
}
