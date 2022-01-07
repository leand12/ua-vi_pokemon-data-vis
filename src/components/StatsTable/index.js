import React from 'react'

export default function StatsTable(props) {
    /*
        props.data = pokemon information 
    */

    const attributes = ["hp", "attack", "speed", "defense", "sp_defense", "sp_attack"];
    const colors = ["red", "yellow", "lightgreen", "green", "lightblue", "blue"]
    
    return (
        <div>
            <table >
                <tbody>
                    {Object.keys(props.data).map((k, i) => {
                        if (attributes.includes(k)) {
                            return (
                                <tr key={""+ i + " " + props.data.name}>
                                    <td style={{ fontWeight: "bold" }}>
                                        {k.toUpperCase().replaceAll("_", " ")}
                                    </td>
                                    <td style={{paddingLeft: "10px", paddingRight: "10px"}}>
                                        {props.data[k]}
                                    </td>
                                    <td style={{ width: "255px" }}>
                                        <div style={{ width: `calc(100%*${props.data[k]}/255)`,
                                         height: "20px", backgroundColor: colors[Math.floor(props.data[k]/50)],
                                         borderRadius: "10px"
                                         }}>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}
