/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import { observer } from "mobx-react-lite"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { Currency, displayMoney } from "mysterium-vpn-js"

import { useStores } from "../../store"
import { NavToggle } from "../../ui-kit/toggle/nav-toggle"
import { brandDarker } from "../../ui-kit/colors"
import { locations } from "../../navigation/locations"

import { Myst } from "./myst"

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:first-child {
        margin-right: auto;
    }
`

interface MoneyProps {
    active: boolean
}

const Money = styled.div<MoneyProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props: MoneyProps): string => (props.active ? "#fff" : brandDarker)};
    span {
        padding-right: 4px;
    }
`

export const WalletButton: React.FC = observer(() => {
    const { identity, navigation } = useStores()
    const location = useLocation()

    const balance = displayMoney(
        {
            amount: identity.identity?.balance ?? 0,
            currency: Currency.MYSTTestToken,
        },
        {
            fractionDigits: 3,
            removeInsignificantZeros: false,
        },
    )
    const active = location.pathname == locations.wallet
    const onClick = (): void => {
        if (!active) {
            navigation.navigateTo(locations.wallet)
        }
    }
    return (
        <NavToggle small active={active} onClick={onClick}>
            <Content>
                <span>Wallet</span>
                <Money active={active}>
                    <span>{balance}</span>
                    <Myst light={active} />
                </Money>
            </Content>
        </NavToggle>
    )
})
