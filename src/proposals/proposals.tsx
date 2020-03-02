import React from "react";
import {useStores} from "../store";
import {View, Text} from "@nodegui/react-nodegui";
import {observer} from "mobx-react-lite";
import {Proposal} from "./proposal";

export const Proposals = observer(() => {
    const {proposals} = useStores()
    const byCountry = proposals.byCountry;
    return (
        <View id="container" styleSheet={styleSheet}>
            {Object.keys(byCountry).sort().map(country => (
                <View id="bycountry">
                    <Text id="country" >{country}</Text>
                    {byCountry[country].map(p => <Proposal {...p}/>)}
                </View>
            ))}
        </View>
    )
})


const styleSheet = `
#container {
    background: #95a5a6;
    flex-direction: column;
    padding: 7px;
    padding-bottom: 27px;
}
#bycountry {
    flex-direction: column;
}
#country {
    margin: 5px;
}
`
