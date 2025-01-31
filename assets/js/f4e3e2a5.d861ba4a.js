"use strict";(self.webpackChunkweb_visualizer=self.webpackChunkweb_visualizer||[]).push([[586],{4754:(M,I,e)=>{e.r(I),e.d(I,{assets:()=>z,contentTitle:()=>n,default:()=>t,frontMatter:()=>j,metadata:()=>g,toc:()=>c});const g=JSON.parse('{"id":"receiving-events","title":"Handling Events from the Visualizer iFrame","description":"---","source":"@site/docs/3-receiving-events.md","sourceDirName":".","slug":"/receiving-events","permalink":"/visualizer-docs/docs/receiving-events","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/3-receiving-events.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Embedding the Visualizer","permalink":"/visualizer-docs/docs/embedding-visualizer"},"next":{"title":"Data Flow and Communication Architecture","permalink":"/visualizer-docs/docs/sending-events"}}');var i=e(4848),N=e(8453);const j={},n="Handling Events from the Visualizer iFrame",z={},c=[{value:"1. Event Listener Setup",id:"1-event-listener-setup",level:2},{value:"useMessages Hook",id:"usemessages-hook",level:3},{value:"2. Handling New Event Types",id:"2-handling-new-event-types",level:2},{value:"Loading States",id:"loading-states",level:3},{value:"WrapCar Event",id:"wrapcar-event",level:3},{value:"3. UI Feedback Components",id:"3-ui-feedback-components",level:2},{value:"LoadingButton Implementation",id:"loadingbutton-implementation",level:3},{value:"4. Error Handling",id:"4-error-handling",level:2}];function a(M){const I={br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",p:"p",pre:"pre",strong:"strong",...(0,N.R)(),...M.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(I.header,{children:(0,i.jsx)(I.h1,{id:"handling-events-from-the-visualizer-iframe",children:"Handling Events from the Visualizer iFrame"})}),"\n",(0,i.jsx)(I.hr,{}),"\n",(0,i.jsx)(I.h1,{id:"capturing-and-responding-to-iframe-events",children:"Capturing and Responding to iFrame Events"}),"\n",(0,i.jsx)(I.p,{children:"This tutorial explains how to listen for events from the visualizer iFrame (e.g., loading states, errors) and update your React UI dynamically."}),"\n",(0,i.jsx)(I.hr,{}),"\n",(0,i.jsx)(I.h2,{id:"1-event-listener-setup",children:"1. Event Listener Setup"}),"\n",(0,i.jsx)(I.h3,{id:"usemessages-hook",children:"useMessages Hook"}),"\n",(0,i.jsxs)(I.p,{children:["The ",(0,i.jsx)(I.code,{children:"useMessages"})," hook (from ",(0,i.jsx)(I.code,{children:"hooks/useMessages.js"}),") is the core of event handling. It attaches a ",(0,i.jsx)(I.code,{children:"message"})," event listener to the window:"]}),"\n",(0,i.jsx)(I.pre,{children:(0,i.jsx)(I.code,{className:"language-javascript",children:'// Simplified example - Full code in colors.md\nexport function useMessages(vehicleUUID) {\n  const [loadingState, setLoadingState] = useState("idle");\n  \n  useEffect(() => {\n    const handleMessage = (event) => {\n      const eventData = JSON.parse(event.data);\n      \n      // Handle loading events\n      if (eventData.Type === "LoadingStarted") {\n        setLoadingState("loading");\n      }\n      if (eventData.Type === "LoadingFinished") {\n        setLoadingState("success");\n      }\n      if (eventData.Type === "LoadingFailed") {\n        setLoadingState("error");\n      }\n    };\n\n    window.addEventListener("message", handleMessage);\n    return () => window.removeEventListener("message", handleMessage);\n  }, []);\n\n  return { loadingState };\n}\n'})}),"\n",(0,i.jsx)(I.hr,{}),"\n",(0,i.jsx)(I.h2,{id:"2-handling-new-event-types",children:"2. Handling New Event Types"}),"\n",(0,i.jsx)(I.h3,{id:"loading-states",children:"Loading States"}),"\n",(0,i.jsx)(I.p,{children:"Events follow this structure:"}),"\n",(0,i.jsx)(I.pre,{children:(0,i.jsx)(I.code,{className:"language-javascript",children:'// From new-events.md\n{\n  Type: "LoadingStarted" | "LoadingFinished" | "LoadingFailed",\n  Value: "Error message (optional)"\n}\n'})}),"\n",(0,i.jsxs)(I.p,{children:[(0,i.jsx)(I.strong,{children:"Integration Example"}),":"]}),"\n",(0,i.jsx)(I.pre,{children:(0,i.jsx)(I.code,{className:"language-javascript",children:'// In your component\nconst { loadingState, error } = useMessages();\n\nreturn (\n  <div>\n    {loadingState === "loading" && <Spinner />}\n    {loadingState === "error" && <ErrorBanner message={error} />}\n  </div>\n);\n'})}),"\n",(0,i.jsx)(I.h3,{id:"wrapcar-event",children:"WrapCar Event"}),"\n",(0,i.jsx)(I.p,{children:"Trigger the visualizer\u2019s wrap process by sending:"}),"\n",(0,i.jsx)(I.pre,{children:(0,i.jsx)(I.code,{className:"language-javascript",children:'// From new-events.md\nsendCommand({ type: "WrapCar" });\n'})}),"\n",(0,i.jsx)(I.hr,{}),"\n",(0,i.jsx)(I.h2,{id:"3-ui-feedback-components",children:"3. UI Feedback Components"}),"\n",(0,i.jsx)(I.h3,{id:"loadingbutton-implementation",children:"LoadingButton Implementation"}),"\n",(0,i.jsxs)(I.p,{children:["Use the ",(0,i.jsx)(I.code,{children:"LoadingButton"})," component to reflect real-time states:"]}),"\n",(0,i.jsx)(I.pre,{children:(0,i.jsx)(I.code,{className:"language-javascript",children:'// From new-events.md\nexport function LoadingButton({ onClick, loading, text, error }) {\n  return (\n    <>\n      {loading && <div className="loader" />}\n      {error && <div className="error">{error}</div>}\n      <button onClick={onClick} disabled={loading}>\n        {text}\n      </button>\n    </>\n  );\n}\n\n// Usage\n<LoadingButton \n  onClick={() => sendCommand({ type: "WrapCar" })}\n  loading={loadingState === "loading"}\n  error={loadingState === "error"}\n  text="Start Wrapping"\n/>\n'})}),"\n",(0,i.jsx)(I.hr,{}),"\n",(0,i.jsx)(I.h2,{id:"4-error-handling",children:"4. Error Handling"}),"\n",(0,i.jsxs)(I.p,{children:["Capture and display errors from ",(0,i.jsx)(I.code,{children:"LoadingFailed"})," events:"]}),"\n",(0,i.jsx)(I.pre,{children:(0,i.jsx)(I.code,{className:"language-javascript",children:'// In useMessages.js\nif (eventData.Type === "LoadingFailed") {\n  console.error("Visualizer error:", eventData.Value);\n  dispatchWrapper({ type: "SET_ERROR", payload: eventData.Value });\n}\n'})}),"\n",(0,i.jsx)(I.hr,{}),"\n",(0,i.jsxs)(I.p,{children:[(0,i.jsx)(I.img,{alt:"Event Workflow Diagram",src:e(9585).A+"",width:"460",height:"632"}),(0,i.jsx)(I.br,{}),"\n",(0,i.jsx)(I.em,{children:"Fig 2. Event communication sequence between app and iFrame"})]}),"\n",(0,i.jsx)(I.hr,{})]})}function t(M={}){const{wrapper:I}={...(0,N.R)(),...M.components};return I?(0,i.jsx)(I,{...M,children:(0,i.jsx)(a,{...M})}):a(M)}},9585:(M,I,e)=>{e.d(I,{A:()=>g});const g="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ1OS41ODIwNDM4ODY2NzkzNCA2MzEuODczOTIxNDI5OTMxIiB3aWR0aD0iNDU5LjU4MjA0Mzg4NjY3OTM0IiBoZWlnaHQ9IjYzMS44NzM5MjE0Mjk5MzEiPgogIDwhLS0gc3ZnLXNvdXJjZTpleGNhbGlkcmF3IC0tPgogIAogIDxkZWZzPgogICAgPHN0eWxlIGNsYXNzPSJzdHlsZS1mb250cyI+CiAgICAgIEBmb250LWZhY2UgewogICAgICAgIGZvbnQtZmFtaWx5OiAiVmlyZ2lsIjsKICAgICAgICBzcmM6IHVybCgiaHR0cHM6Ly9leGNhbGlkcmF3LmNvbS9WaXJnaWwud29mZjIiKTsKICAgICAgfQogICAgICBAZm9udC1mYWNlIHsKICAgICAgICBmb250LWZhbWlseTogIkNhc2NhZGlhIjsKICAgICAgICBzcmM6IHVybCgiaHR0cHM6Ly9leGNhbGlkcmF3LmNvbS9DYXNjYWRpYS53b2ZmMiIpOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgCiAgPC9kZWZzPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI0NTkuNTgyMDQzODg2Njc5MzQiIGhlaWdodD0iNjMxLjg3MzkyMTQyOTkzMSIgZmlsbD0iI2ZmZmZmZiI+PC9yZWN0PjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTY0LjgzODE5OTE2NTI1ODIzIDEzMy4xNjczMTI3NTYwMTg3Nikgcm90YXRlKDAgNjYuODkzMzMzNDc2NTE3MiAxNy41KSI+PHBhdGggZD0iTTguNzUgMCBDNDIuNDIgMC43MSwgNzUuODMgMC41LCAxMjUuMDQgMCBNOC43NSAwIEM0NS4xOCAtMC4yOCwgODAuODkgLTAuNDQsIDEyNS4wNCAwIE0xMjUuMDQgMCBDMTMwLjU5IDAuMTIsIDEzMy43MiAyLjc0LCAxMzMuNzkgOC43NSBNMTI1LjA0IDAgQzEzMC44OCAwLjQ4LCAxMzMuOTcgMy41LCAxMzMuNzkgOC43NSBNMTMzLjc5IDguNzUgQzEzMy4zOCAxMy4xNSwgMTM0LjIgMTcuOTQsIDEzMy43OSAyNi4yNSBNMTMzLjc5IDguNzUgQzEzMy43NyAxNS4xNSwgMTMzLjgxIDIxLjgxLCAxMzMuNzkgMjYuMjUgTTEzMy43OSAyNi4yNSBDMTM0LjEgMzIuNDQsIDEzMC4zOSAzNC43NCwgMTI1LjA0IDM1IE0xMzMuNzkgMjYuMjUgQzEzNC4wMiAzMi4zMywgMTMwLjM3IDM1LjQsIDEyNS4wNCAzNSBNMTI1LjA0IDM1IEM4NS41IDM0LjcyLCA0Ni41NyAzNS4yOCwgOC43NSAzNSBNMTI1LjA0IDM1IEM5NC4zOSAzNS4xLCA2NC4yMiAzNC45LCA4Ljc1IDM1IE04Ljc1IDM1IEMzLjA4IDM0LjUzLCAtMC4xOCAzMi41OCwgMCAyNi4yNSBNOC43NSAzNSBDMy4zOSAzNS4xMiwgMC41NSAzMS42OCwgMCAyNi4yNSBNMCAyNi4yNSBDLTAuMzkgMTkuNjcsIDAuNDggMTIuNzUsIDAgOC43NSBNMCAyNi4yNSBDLTAuMjMgMTkuNTEsIC0wLjIgMTIuNDUsIDAgOC43NSBNMCA4Ljc1IEMtMC40OCAyLjk4LCAzLjA0IDAuMDksIDguNzUgMCBNMCA4Ljc1IEMtMC40NCAyLjM5LCAyLjI3IDAuMDQsIDguNzUgMCIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg2LjI4MTU4MTQ2OTkwMDQzIDEzOC4xNjczMTI3NTYwMTg3Nikgcm90YXRlKDAgNDUuNDQ5OTUxMTcxODc1IDEyLjUpIj48dGV4dCB4PSI0NS40NDk5NTExNzE4NzUiIHk9IjAiIGZvbnQtZmFtaWx5PSJWaXJnaWwsIFNlZ29lIFVJIEVtb2ppIiBmb250LXNpemU9IjIwcHgiIGZpbGw9IiMxZTFlMWUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJ3aGl0ZS1zcGFjZTogcHJlOyIgZGlyZWN0aW9uPSJsdHIiIGRvbWluYW50LWJhc2VsaW5lPSJ0ZXh0LWJlZm9yZS1lZGdlIj5WaXN1YWxpemVyPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OC4yOTExOTAyNzM2MjMzMyA1NC40OTE4MTkzODIxNTM3Mikgcm90YXRlKDAgMTQxLjQ5OTg2MjY3MDg5ODQ0IDI1KSI+PHRleHQgeD0iMCIgeT0iMCIgZm9udC1mYW1pbHk9IlZpcmdpbCwgU2Vnb2UgVUkgRW1vamkiIGZvbnQtc2l6ZT0iMjBweCIgZmlsbD0iIzFlMWUxZSIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0id2hpdGUtc3BhY2U6IHByZTsiIGRpcmVjdGlvbj0ibHRyIiBkb21pbmFudC1iYXNlbGluZT0idGV4dC1iZWZvcmUtZWRnZSI+VmlzdWFsaXplciBzZW5kcyBhIGxpc3Qgb2Y8L3RleHQ+PHRleHQgeD0iMCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJWaXJnaWwsIFNlZ29lIFVJIEVtb2ppIiBmb250LXNpemU9IjIwcHgiIGZpbGw9IiMxZTFlMWUiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9IndoaXRlLXNwYWNlOiBwcmU7IiBkaXJlY3Rpb249Imx0ciIgZG9taW5hbnQtYmFzZWxpbmU9InRleHQtYmVmb3JlLWVkZ2UiPnBvc3NpYmxlIGV2ZW50cyB0byB0aGUgY2xpZW50PC90ZXh0PjwvZz48ZyBtYXNrPSJ1cmwoI21hc2stdFhHckxSQ203XzU1b290dnhzbDRSKSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODcuMjU3MjIyMjQ0MjExMjIgNTM2LjcwODY2MTQzNDkyMDcpIHJvdGF0ZSgwIDAuNDYwMzMxMDg4MDE5MzAyMSAtNzEuNzQyODkxODI0MDUyMTcpIj48cGF0aCBkPSJNLTAuMTEgLTAuMSBDMC4wNCAtMjQuMDEsIDAuODYgLTExOS41NSwgMS4wMyAtMTQzLjQ2IE0wLjExIDAuMTcgQzAuMjMgLTIzLjc4LCAwLjgzIC0xMTkuNzMsIDAuOTQgLTE0My42NiIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg3LjI1NzIyMjI0NDIxMTIyIDUzNi43MDg2NjE0MzQ5MjA3KSByb3RhdGUoMCAwLjQ2MDMzMTA4ODAxOTMwMjEgLTcxLjc0Mjg5MTgyNDA1MjE3KSI+PHBhdGggZD0iTTExLjA1IC0xMTUuNDEgQzYuOTUgLTEyNi4yMiwgMy41IC0xMzcuMzgsIDAuOTQgLTE0My42NiBNMTEuMDUgLTExNS40MSBDNy42MyAtMTI0LjU2LCA0LjM0IC0xMzMuOTUsIDAuOTQgLTE0My42NiIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg3LjI1NzIyMjI0NDIxMTIyIDUzNi43MDg2NjE0MzQ5MjA3KSByb3RhdGUoMCAwLjQ2MDMzMTA4ODAxOTMwMjEgLTcxLjc0Mjg5MTgyNDA1MjE3KSI+PHBhdGggZD0iTS05LjQ3IC0xMTUuNTIgQy01LjY1IC0xMjYuMjYsIC0xLjE3IC0xMzcuMzksIDAuOTQgLTE0My42NiBNLTkuNDcgLTExNS41MiBDLTYuMiAtMTI0LjYyLCAtMi44IC0xMzMuOTgsIDAuOTQgLTE0My42NiIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PC9nPjxtYXNrIGlkPSJtYXNrLXRYR3JMUkNtN181NW9vdHZ4c2w0UiI+PHJlY3QgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiIgd2lkdGg9IjI4OC4yMjc0Nzc0NTk2MDkyIiBoZWlnaHQ9Ijc4MC4zMDY0MzMzMTM4MTMyIj48L3JlY3Q+PHJlY3QgeD0iMTUyLjkxMjM4NjE2NzgyODE3IiB5PSI0NTIuNDA5Nzc1NDk1NDc0NTUiIGZpbGw9IiMwMDAiIHdpZHRoPSI2OS42NTk5MjczNjgxNjQwNiIgaGVpZ2h0PSIyNSIgb3BhY2l0eT0iMSI+PC9yZWN0PjwvbWFzaz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTIuOTEyMzg2MTY3ODI4MTcgNDUyLjQwOTc3NTQ5NTQ3NDUpIHJvdGF0ZSgwIDM0LjgwNTE2NzE2NDQwMjM1IDEyLjU1NTk5NDExNTM5NCkiPjx0ZXh0IHg9IjM0LjgyOTk2MzY4NDA4MjAzIiB5PSIwIiBmb250LWZhbWlseT0iVmlyZ2lsLCBTZWdvZSBVSSBFbW9qaSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjMWUxZTFlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHlsZT0id2hpdGUtc3BhY2U6IHByZTsiIGRpcmVjdGlvbj0ibHRyIiBkb21pbmFudC1iYXNlbGluZT0idGV4dC1iZWZvcmUtZWRnZSI+TGlzdGVuczwvdGV4dD48L2c+PGcgbWFzaz0idXJsKCNtYXNrLWdpTTJ4YjU1Q0FkWmtYaXFOOGtGVikiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkxLjA3NDUzMDI5MTc4ODg1IDM5OC45MzI0MjA4NDg0MTU4KSByb3RhdGUoMCAxLjQzMjQwOTY2MTcwNjgyNzggNjguODg4OTQzMzY3MjYzMDIpIj48cGF0aCBkPSJNLTAuMDIgLTAuMDggQzAuNDUgMjIuODUsIDIuMzMgMTE0LjcsIDIuNzkgMTM3LjcgTS0wLjIxIDAuMjEgQzAuMzEgMjMuMTYsIDIuNTMgMTE0Ljk0LCAzLjA3IDEzNy44NiIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkxLjA3NDUzMDI5MTc4ODg1IDM5OC45MzI0MjA4NDg0MTU4KSByb3RhdGUoMCAxLjQzMjQwOTY2MTcwNjgyNzggNjguODg4OTQzMzY3MjYzMDIpIj48cGF0aCBkPSJNLTcuODYgMTA5LjkyIEMtNC44IDExNy44NiwgLTEuNTkgMTI1Ljk5LCAzLjA3IDEzNy44NiBNLTcuODYgMTA5LjkyIEMtMy41NCAxMjAuOTYsIDAuNzIgMTMxLjkyLCAzLjA3IDEzNy44NiIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkxLjA3NDUzMDI5MTc4ODg1IDM5OC45MzI0MjA4NDg0MTU4KSByb3RhdGUoMCAxLjQzMjQwOTY2MTcwNjgyNzggNjguODg4OTQzMzY3MjYzMDIpIj48cGF0aCBkPSJNMTIuNjUgMTA5LjQzIEM5LjcyIDExNy41MSwgNi45NCAxMjUuNzgsIDMuMDcgMTM3Ljg2IE0xMi42NSAxMDkuNDMgQzguODkgMTIwLjY4LCA1LjA3IDEzMS44MiwgMy4wNyAxMzcuODYiIHN0cm9rZT0iIzFlMWUxZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48L3BhdGg+PC9nPjwvZz48bWFzayBpZD0ibWFzay1naU0yeGI1NUNBZFprWGlxTjhrRlYiPjxyZWN0IHg9IjAiIHk9IjAiIGZpbGw9IiNmZmYiIHdpZHRoPSIzOTMuOTg1Mjk1OTM3OTgyNjQiIGhlaWdodD0iNjM2LjcwODY2MTQzNDkyMDciPjwvcmVjdD48cmVjdCB4PSIyNTkuMzM5OTQxMTkxMDU3NiIgeT0iNDU1LjMyMDU0MTE0MTY2ODIzIiBmaWxsPSIjMDAwIiB3aWR0aD0iNjYuMzc5OTQzODQ3NjU2MjUiIGhlaWdodD0iMjUiIG9wYWNpdHk9IjEiPjwvcmVjdD48L21hc2s+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU5LjMzOTk0MTE5MTA1NzYgNDU1LjMyMDU0MTE0MTY2ODIzKSByb3RhdGUoMCAzMy4xNjY5OTg3NjI0MzgwNTUgMTIuNTAwODIzMDc0MDEwNTk3KSI+PHRleHQgeD0iMzMuMTg5OTcxOTIzODI4MTI1IiB5PSIwIiBmb250LWZhbWlseT0iVmlyZ2lsLCBTZWdvZSBVSSBFbW9qaSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjMWUxZTFlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHlsZT0id2hpdGUtc3BhY2U6IHByZTsiIGRpcmVjdGlvbj0ibHRyIiBkb21pbmFudC1iYXNlbGluZT0idGV4dC1iZWZvcmUtZWRnZSI+RXZlbnRzPC90ZXh0PjwvZz48ZyBtYXNrPSJ1cmwoI21hc2stbm9YaHdlaGNQdl9Md2xST2hJeklQKSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzAuODU4MTg3NTM4MDEyNTcgMTc1Ljc3MzcyMTMwNjg5Mzc4KSByb3RhdGUoMCAxLjg2NTI1NTE0NzMzMzQ0MjcgODEuOTkwNjg1MjY3MjQ5NTcpIj48cGF0aCBkPSJNMCAtMC4xNCBDMC42NiAyNy4yMiwgMy4yNiAxMzYuNzcsIDMuOTIgMTY0LjEyIE0tMC4xOSAwLjEzIEMwLjQ1IDI3LjQ1LCAzLjEyIDEzNi41OSwgMy43OSAxNjMuOTIiIHN0cm9rZT0iIzFlMWUxZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMC44NTgxODc1MzgwMTI1NyAxNzUuNzczNzIxMzA2ODkzNzgpIHJvdGF0ZSgwIDEuODY1MjU1MTQ3MzMzNDQyNyA4MS45OTA2ODUyNjcyNDk1NykiPjxwYXRoIGQ9Ik0tNy4xNiAxMzUuOTkgQy00LjQ2IDE0My41NCwgLTAuOTQgMTUxLjE5LCAzLjc5IDE2My45MiBNLTcuMTYgMTM1Ljk5IEMtNC4wMyAxNDMuODksIC0wLjkzIDE1Mi4wMSwgMy43OSAxNjMuOTIiIHN0cm9rZT0iIzFlMWUxZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMC44NTgxODc1MzgwMTI1NyAxNzUuNzczNzIxMzA2ODkzNzgpIHJvdGF0ZSgwIDEuODY1MjU1MTQ3MzMzNDQyNyA4MS45OTA2ODUyNjcyNDk1NykiPjxwYXRoIGQ9Ik0xMy4zNiAxMzUuNDggQzEwLjQ5IDE0My4xNywgOC40NCAxNTAuOTUsIDMuNzkgMTYzLjkyIE0xMy4zNiAxMzUuNDggQzEwLjU5IDE0My41LCA3LjggMTUxLjc2LCAzLjc5IDE2My45MiIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PC9nPjxtYXNrIGlkPSJtYXNrLW5vWGh3ZWhjUHZfTHdsUk9oSXpJUCI+PHJlY3QgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiIgd2lkdGg9IjMzNC43OTk3Mjc3OTg3MDkzNCIgaGVpZ2h0PSI0MzkuNzQ2ODUyNzA5MTQyNiI+PC9yZWN0PjxyZWN0IHg9IjIwNi4wMzg5NzIwMTE2MjI2NiIgeT0iMjQ1LjI2MDI4NzAwODAxODE3IiBmaWxsPSIjMDAwIiB3aWR0aD0iNTMuNTc5OTcxMzEzNDc2NTYiIGhlaWdodD0iMjUiIG9wYWNpdHk9IjEiPjwvcmVjdD48L21hc2s+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjA2LjAzODk3MjAxMTYyMjY2IDI0NS4yNjAyODcwMDgwMTgxNykgcm90YXRlKDAgMjYuNjg0NDcwNjczNzIzMzU0IDEyLjUwNDExOTU2NjEyNTE4MykiPjx0ZXh0IHg9IjI2Ljc4OTk4NTY1NjczODI4IiB5PSIwIiBmb250LWZhbWlseT0iVmlyZ2lsLCBTZWdvZSBVSSBFbW9qaSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjMWUxZTFlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHlsZT0id2hpdGUtc3BhY2U6IHByZTsiIGRpcmVjdGlvbj0ibHRyIiBkb21pbmFudC1iYXNlbGluZT0idGV4dC1iZWZvcmUtZWRnZSI+RGF0YTwvdGV4dD48L2c+PGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzIuNjc0MTQ2ODgwNzQ5IDU0Mi4zODIxMDI3MTY2NTUpIHJvdGF0ZSgwIDY2Ljg5MzMzMzQ3NjUxNzIgMTcuNSkiPjxwYXRoIGQ9Ik04Ljc1IDAgQzMzLjI2IDAuNDcsIDU3LjU5IC0wLjE4LCAxMjUuMDQgMCBNOC43NSAwIEM1Mi45NyAtMC4wNiwgOTYuOTUgMC4zNiwgMTI1LjA0IDAgTTEyNS4wNCAwIEMxMzAuNTggLTAuNTEsIDEzMy41MiAyLjk0LCAxMzMuNzkgOC43NSBNMTI1LjA0IDAgQzEzMC4yOCAwLjU1LCAxMzMuNzggMy4xOSwgMTMzLjc5IDguNzUgTTEzMy43OSA4Ljc1IEMxMzMuNTYgMTMuNDIsIDEzNC4wNyAxNy45LCAxMzMuNzkgMjYuMjUgTTEzMy43OSA4Ljc1IEMxMzMuNjUgMTQuMywgMTMzLjkxIDE5LjYzLCAxMzMuNzkgMjYuMjUgTTEzMy43OSAyNi4yNSBDMTM0LjExIDMyLjM1LCAxMzAuMyAzNC40OSwgMTI1LjA0IDM1IE0xMzMuNzkgMjYuMjUgQzEzMy41NSAzMS44NCwgMTMxLjQ2IDM0LjY0LCAxMjUuMDQgMzUgTTEyNS4wNCAzNSBDODYuNzkgMzQuNzMsIDQ4LjUyIDM0LjQ3LCA4Ljc1IDM1IE0xMjUuMDQgMzUgQzk4LjI0IDM1LjIxLCA3MS4wNSAzNS4xNywgOC43NSAzNSBNOC43NSAzNSBDMi40MyAzNC41OCwgLTAuNTMgMzEuODQsIDAgMjYuMjUgTTguNzUgMzUgQzIuOTggMzQuNTEsIC0wLjU2IDMxLjk3LCAwIDI2LjI1IE0wIDI2LjI1IEMwLjE5IDE5Ljg0LCAtMC4yIDEyLjk4LCAwIDguNzUgTTAgMjYuMjUgQzAuMTQgMjIuMzYsIC0wLjE3IDE4LjgxLCAwIDguNzUgTTAgOC43NSBDLTAuNDEgMi45NiwgMy40NyAwLjA0LCA4Ljc1IDAgTTAgOC43NSBDMC4xMyAyLjYyLCAyLjQxIDAuNTcsIDguNzUgMCIgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEyLjUxNzUwNzgyMzA4NjUgNTQ3LjM4MjEwMjcxNjY1NSkgcm90YXRlKDAgMjcuMDQ5OTcyNTM0MTc5Njg4IDEyLjUpIj48dGV4dCB4PSIyNy4wNDk5NzI1MzQxNzk2ODgiIHk9IjAiIGZvbnQtZmFtaWx5PSJWaXJnaWwsIFNlZ29lIFVJIEVtb2ppIiBmb250LXNpemU9IjIwcHgiIGZpbGw9IiMxZTFlMWUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJ3aGl0ZS1zcGFjZTogcHJlOyIgZGlyZWN0aW9uPSJsdHIiIGRvbWluYW50LWJhc2VsaW5lPSJ0ZXh0LWJlZm9yZS1lZGdlIj5DbGllbnQ8L3RleHQ+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcwLjgxNzE1OTk2ODM4NTk3IDM1Mi4zMjQ3NjQzODY0NzgzKSByb3RhdGUoMCA2Ni44OTMzMzM0NzY1MTcyIDE3LjUpIj48cGF0aCBkPSJNOC43NSAwIEM1NS4yMiAtMC40NywgMTAwLjYzIDAuMzIsIDEyNS4wNCAwIE04Ljc1IDAgQzUwLjAyIC0wLjA3LCA5MS40NCAwLjAzLCAxMjUuMDQgMCBNMTI1LjA0IDAgQzEzMC42NiAwLjUxLCAxMzMuNzIgMi45NiwgMTMzLjc5IDguNzUgTTEyNS4wNCAwIEMxMzAuNjMgLTAuNTEsIDEzMy45NCAzLjA5LCAxMzMuNzkgOC43NSBNMTMzLjc5IDguNzUgQzEzMy43NCAxMy42NywgMTMzLjQ5IDE4LjYyLCAxMzMuNzkgMjYuMjUgTTEzMy43OSA4Ljc1IEMxMzMuODcgMTMuMDYsIDEzMy45NSAxNi42NywgMTMzLjc5IDI2LjI1IE0xMzMuNzkgMjYuMjUgQzEzMy41NCAzMi42MywgMTMxLjQgMzQuOTMsIDEyNS4wNCAzNSBNMTMzLjc5IDI2LjI1IEMxMzMuMjkgMzIuMTksIDEzMS40NiAzNS4xOSwgMTI1LjA0IDM1IE0xMjUuMDQgMzUgQzk0LjkzIDM0Ljk4LCA2NS42IDM1LjgxLCA4Ljc1IDM1IE0xMjUuMDQgMzUgQzgzLjk3IDM0Ljg1LCA0My4zMiAzNC44NywgOC43NSAzNSBNOC43NSAzNSBDMi43MiAzNC44LCAtMC4zOCAzMS44MSwgMCAyNi4yNSBNOC43NSAzNSBDMi4zNSAzNC43NSwgLTAuNDIgMzEuODcsIDAgMjYuMjUgTTAgMjYuMjUgQy0wLjMxIDIyLjYyLCAwLjA4IDE5LjQxLCAwIDguNzUgTTAgMjYuMjUgQzAuMDcgMjEuMTUsIDAuMTggMTYuMTksIDAgOC43NSBNMCA4Ljc1IEMtMC40MiAyLjkxLCAzLjM5IC0wLjM1LCA4Ljc1IDAgTTAgOC43NSBDLTAuMTkgMi42NSwgMi44NyAtMC41MSwgOC43NSAwIiBzdHJva2U9IiMxZTFlMWUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODAuOTUwNTU5OTczMjIzNDggMzU3LjMyNDc2NDM4NjQ3ODMpIHJvdGF0ZSgwIDU2Ljc1OTkzMzQ3MTY3OTY5IDEyLjUpIj48dGV4dCB4PSI1Ni43NTk5MzM0NzE2Nzk2OSIgeT0iMCIgZm9udC1mYW1pbHk9IlZpcmdpbCwgU2Vnb2UgVUkgRW1vamkiIGZvbnQtc2l6ZT0iMjBweCIgZmlsbD0iIzFlMWUxZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgc3R5bGU9IndoaXRlLXNwYWNlOiBwcmU7IiBkaXJlY3Rpb249Imx0ciIgZG9taW5hbnQtYmFzZWxpbmU9InRleHQtYmVmb3JlLWVkZ2UiPlN1YnNjcmlwdGlvbjwvdGV4dD48L2c+PC9zdmc+Cg=="},8453:(M,I,e)=>{e.d(I,{R:()=>j,x:()=>n});var g=e(6540);const i={},N=g.createContext(i);function j(M){const I=g.useContext(N);return g.useMemo((function(){return"function"==typeof M?M(I):{...I,...M}}),[I,M])}function n(M){let I;return I=M.disableParentContext?"function"==typeof M.components?M.components(i):M.components||i:j(M.components),g.createElement(N.Provider,{value:I},M.children)}}}]);