import React from "react";

function ProcessPhase({phase}) {
  function getStyle() {
    if (phase === 'Applied') {
      return {
        fontWeight: 700,
        color: 'green'
      }
    }
    else if (phase === 'Final Answer' || phase === 'Rejected' || phase === 'Hired') {
      return {
        fontWeight: 700,
        color: 'red'
      }
    } else {
      return {
        fontWeight: 700,
        color: 'orange'
      }
    }
  }
  return <>
    <p style={getStyle()}>{phase}</p>
  </>
}

export default ProcessPhase