import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

export * from 'monaco-editor'

const WorkerMap = [
  {
    match: ['json'],
    Worker: JsonWorker
  },
  {
    match: ['css', 'less', 'scss'],
    Worker: CssWorker
  },
  {
    match: ['html', 'handlebars', 'razor'],
    Worker: HtmlWorker
  },
  {
    match: ['typescript', 'javascript'],
    Worker: TsWorker
  }
]

self.MonacoEnvironment = {
  getWorker(_, label) {
    const Worker =
      WorkerMap.find(item => item.match.includes(label))?.Worker || EditorWorker
    return new Worker()
  }
}
