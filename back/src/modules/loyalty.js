/**
 * Map of handled loyalty statuses
 */
exports.STATUSES = {
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

/**
 * Return a loyalty status label from a completed rides count
 * @param {Number} completedRidesCount - Number of completed rides
 * @returns {String|null}
 */
exports.computeLoyaltyStatus = function computeLoyaltyStatus(
  completedRidesCount
) {
  if (!Number.isInteger(completedRidesCount) || completedRidesCount < 0) {
    return null
  }

  if (completedRidesCount >= 0 && completedRidesCount < 20) {
    return exports.STATUSES.bronze.label
  } else if (completedRidesCount < 50) {
    return exports.STATUSES.silver.label
  } else if (completedRidesCount < 100) {
    return exports.STATUSES.gold.label
  } else {
    return exports.STATUSES.platinum.label
  }
}

/**
 * Return loyalty points from a status and the paid amount
 * @param {String} currentLoyaltyStatus - Loyalty status label
 * @param {Number} paidAmount - Ride paid amount
 * @returns {Number|null}
 */
exports.computeLoyaltyPoints = function computeLoyaltyStatus(
  currentLoyaltyStatus,
  paidAmount
) {
  if (
    !currentLoyaltyStatus ||
    !Number.isFinite(paidAmount) ||
    paidAmount < 0 ||
    !Object.keys(exports.STATUSES).includes(currentLoyaltyStatus)
  ) {
    return null
  }

  /**
   * It's a test, so we are generous here, but we should check what makes the most sense:
   *  - Math.round(paidAmount) * pointValue => current choice
   *  - Math.round(paidAmount * pointValue)
   */
  const aproxAmount = Math.round(paidAmount)
  return exports.STATUSES[currentLoyaltyStatus].pointValue * aproxAmount
}
