const STATUSES = {
  bronze: {
    label: 'bronze',
    pointValue: 1,
  },
  silver: {
    label: 'silver',
    pointValue: 3,
  },
  gold: {
    label: 'gold',
    pointValue: 5,
  },
  platinum: {
    label: 'platinum',
    pointValue: 10,
  },
}

exports.computeLoyaltyStatus = function computeLoyaltyStatus(
  completedRidesCount
) {
  if (!Number.isInteger(completedRidesCount) || completedRidesCount < 0) {
    return null
  }

  if (completedRidesCount >= 0 && completedRidesCount < 20) {
    return STATUSES.bronze.label
  } else if (completedRidesCount < 50) {
    return STATUSES.silver.label
  } else if (completedRidesCount < 100) {
    return STATUSES.gold.label
  } else {
    return STATUSES.platinum.label
  }
}

exports.computeLoyaltyPoints = function computeLoyaltyStatus(
  currentLoyaltyStatus,
  paidAmount
) {
  if (
    !Number.isFinite(paidAmount) ||
    !Object.keys(STATUSES).includes(currentLoyaltyStatus)
  ) {
    return null
  }

  const aproxAmount = Math.round(paidAmount)
  return STATUSES[currentLoyaltyStatus].pointValue * aproxAmount
}
