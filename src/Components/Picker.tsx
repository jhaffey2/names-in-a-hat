import React from "react"

type Papers = { [key: string]: number }

export const Picker = () => {
  const [names, setNames] = React.useState("")
  const [papers, setPapers] = React.useState<Papers>()
  const [selected, setSelected] = React.useState("")

  const resetPapers = () => {
    const keys = names.split(",")
    const papers = {} as Papers
    keys.forEach(key => {
      papers[key] = 0
    })
    setPapers(papers)
  }

  const pickName = () => {
    if (!papers) return

    let selections: string[] = []

    Object.keys(papers).forEach((key) => {
      for(let i=0; i < papers[key]; i++){
        selections.push(key)
      }
    })

    const randomName = selections[Math.floor(Math.random() * selections.length)];
    setSelected(randomName)
  }

  return (
    <div style={{ textAlign: "left" }}>
      <div>
        <label>Names - comma delimited</label>
      </div>
      <div>
        <input style={{ width: "500px", marginTop: "8px" }} onChange={(event) => setNames(event.target.value)}/>
      </div>
      <div>
        <button style={{ margin: "16px", marginLeft: "" }} onClick={() => resetPapers()}>Reset Names</button>
      </div>
      <>
        {!!papers && Object.keys(papers).map((key) => {
          return (
            <div>
              <label style={{ marginRight: "8px" }}>{key}</label>
              <input onChange={(event) => setPapers({...papers, [key]: +event.target.value })}/>
            </div>
          )
        })}
        {!!papers && (
          <div>
            <button style={{ marginTop: "16px" }} onClick={() => pickName()} disabled={!papers}>Pick</button>
            <h3>{selected}</h3>
          </div>
        )}
      </>
    </div>
  )
}