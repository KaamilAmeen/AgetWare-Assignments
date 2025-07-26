def min_loss(prices):
    min_loss = float('inf')
    buy_year = -1
    sell_year = -1

    n = len(prices)
    for i in range(n):
        for j in range(i+1, n):
            if prices[j]<prices[i]:
                loss = prices[i] - prices[j]
                if loss < min_loss:
                    min_loss = loss
                    buy_year = i + 1
                    sell_year = j + 1
    if min_loss == float('inf'):
            return "No valid buy-sell pair found (no loss possible)"
        
    return {
        "Buy Year": buy_year,
        "Sell Year": sell_year,
        "Minimum Loss": min_loss
    }
prices = [20, 15, 7, 2, 13]
print(min_loss(prices))
