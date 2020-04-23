/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ChangeEvent } from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Currency, displayMoney } from "mysterium-vpn-js"
import * as _ from "lodash"

import { useStores } from "../../store"
import { textSmall } from "../../ui-kit/typography"

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Title = styled.p`
    ${textSmall}
    color: #777;
    margin: 12px;
    margin-left: 12px;
`

const Range = styled.input`
    margin: 0 12px;
`

export const PriceFilter = observer(() => {
    const { proposals } = useStores()
    const { perMinuteMax, perGibMax } = proposals.priceMaximums
    if (!perMinuteMax || !perGibMax) {
        return <></>
    }
    const pricePerMinDisplay = displayMoney({
        amount: proposals.filter.pricePerMinuteMax ?? 0,
        currency: Currency.MYSTTestToken,
    })
    const pricePerGibDisplay = displayMoney({
        amount: proposals.filter.pricePerGibMax ?? 0,
        currency: Currency.MYSTTestToken,
    })
    const changePerMinuteMaxDebounced = _.debounce((val: number) => {
        proposals.setPricePerMinuteMaxFilter(val)
    }, 500)
    const changePerGibMaxDebounced = _.debounce((val: number) => {
        proposals.setPricePerGibMaxFilter(val)
    }, 500)
    return (
        <Container>
            <Title>Price/minute: {pricePerMinDisplay}</Title>
            <Range
                type="range"
                min={0}
                max={perMinuteMax}
                defaultValue={proposals.filter.pricePerMinuteMax ?? 0}
                step={1000}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                    changePerMinuteMaxDebounced(event.target.valueAsNumber)
                }}
            />
            <Title>Price/GiB: {pricePerGibDisplay}</Title>
            <Range
                type="range"
                min={0}
                max={proposals.priceMaximums.perGibMax}
                defaultValue={proposals.filter.pricePerGibMax ?? 0}
                step={1000}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                    changePerGibMaxDebounced(event.target.valueAsNumber)
                }}
            />
        </Container>
    )
})