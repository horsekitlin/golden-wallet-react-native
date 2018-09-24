import { reaction } from 'mobx'

export default (appState) => {
  return reaction(
    () => appState.config,
    () => {
      appState.wallets.forEach((w) => {
        w.offLoading()
        w.fetchingBalance()
        w.tokens.forEach((t) => {
          t.fetchTransactions(true)
        })
      })
      appState.getGasPriceEstimate()
      appState.loadPendingTxs()
      appState.homeCarousel && appState.homeCarousel.snapToItem(0)
    }
  )
}
