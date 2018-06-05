const { expect } = require('chai')

const {
  STATUSES,
  computeLoyaltyStatus,
  computeLoyaltyPoints,
} = require('../../src/modules/loyalty')

/**
 * From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Returns a random integer between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
  const minValue = Math.ceil(min)
  const maxValue = Math.floor(max)
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue //The maximum is exclusive and the minimum is inclusive
}

describe.only('modules:loyalty', () => {
  describe('computeLoyaltyStatus', () => {
    it('Should return null when the input completed rides count is invalid', () => {
      const invalidRidesCounts = [null, undefined, '23', {}, [], -42]

      for (const invalidCount of invalidRidesCounts) {
        expect(computeLoyaltyStatus(invalidCount)).to.equal(null)
      }
    })

    it('Should return "bronze" status when completed rides count is >= 0 & < 20', () => {
      expect(computeLoyaltyStatus(getRandomInt(0, 20))).to.equal(
        STATUSES.bronze.label
      )
    })

    it('Should return "silver" status when completed rides count is >= 20 & < 50', () => {
      expect(computeLoyaltyStatus(getRandomInt(20, 50))).to.equal(
        STATUSES.silver.label
      )
    })

    it('Should return "gold" status when completed rides count is >= 50 & < 100', () => {
      expect(computeLoyaltyStatus(getRandomInt(50, 100))).to.equal(
        STATUSES.gold.label
      )
    })

    it('Should return "platinum" status when completed rides count is >= 100', () => {
      expect(
        computeLoyaltyStatus(getRandomInt(100, Number.MAX_SAFE_INTEGER))
      ).to.equal(STATUSES.platinum.label)
    })
  })

  describe('computeLoyaltyPoints', () => {
    it('Should return null when the input loyalty status is invalid', () => {
      const invalidLoyaltyStatuses = [null, undefined, 0]

      for (const invalidLoyaltyStatus in invalidLoyaltyStatuses) {
        expect(computeLoyaltyPoints(invalidLoyaltyStatus, 1)).to.equal(null)
      }
    })

    it('Should return null when the input loyalty status is not defined in the reference map', () => {
      const invalidLoyaltyStatuses = ['diamond', 'glass']

      for (const invalidLoyaltyStatus in invalidLoyaltyStatuses) {
        expect(computeLoyaltyPoints(invalidLoyaltyStatus, 1)).to.equal(null)
      }
    })

    it('Should return null when the input paid amount is invalid', () => {
      const invalidPaidAmounts = [
        null,
        undefined,
        Number.POSITIVE_INFINITY,
        -42,
      ]

      for (const invalidPaidAmount in invalidPaidAmounts) {
        expect(
          computeLoyaltyPoints(STATUSES.silver.label, invalidPaidAmount)
        ).to.equal(null)
      }
    })

    it('Should return 1 point per unit of amount paid (rounded) when loyalty status is "bronze"', () => {
      const paidAmounts = [5, 7.7, 2.4]

      for (const paidAmount of paidAmounts) {
        const earnedPoints = computeLoyaltyPoints(
          STATUSES.bronze.label,
          paidAmount
        )

        expect(earnedPoints).to.equal(Math.round(paidAmount))
      }
    })

    /**
     * Check earned points for a loyalty status configuration
     * @param {Array<{inputAmout: Number, expectedPoints: Number}>} paidAmounts - Dataset of input amounts with their expected earned points
     * @param {{label: String, pointValue: Number}} loyaltyConf - Loyalty status configuration
     * @returns {undefined}
     */
    function checkEarnedPointsByLoyaltyStatus(paidAmounts, loyaltyConf) {
      for (const { inputAmout, expectedPoints } of paidAmounts) {
        const earnedPoints = computeLoyaltyPoints(loyaltyConf.label, inputAmout)

        expect(earnedPoints % loyaltyConf.pointValue).to.equal(0)
        expect(earnedPoints).to.equal(expectedPoints)
      }
    }

    it('Should return 3 points per unit of amount paid (rounded) when loyalty status is "silver"', () => {
      const paidAmounts = [
        {
          inputAmout: 5,
          expectedPoints: 15,
        },
        {
          inputAmout: 7.7,
          expectedPoints: 24,
        },
        {
          inputAmout: 2.4,
          expectedPoints: 6,
        },
      ]

      checkEarnedPointsByLoyaltyStatus(paidAmounts, STATUSES.silver)
    })

    it('Should return 5 points per unit of amount paid (rounded) when loyalty status is "gold"', () => {
      const paidAmounts = [
        {
          inputAmout: 5,
          expectedPoints: 25,
        },
        {
          inputAmout: 7.7,
          expectedPoints: 40,
        },
        {
          inputAmout: 2.4,
          expectedPoints: 10,
        },
      ]

      checkEarnedPointsByLoyaltyStatus(paidAmounts, STATUSES.gold)
    })

    it('Should return 10 points per unit of amount paid (rounded) when loyalty status is "platinum"', () => {
      const paidAmounts = [
        {
          inputAmout: 5,
          expectedPoints: 50,
        },
        {
          inputAmout: 7.7,
          expectedPoints: 80,
        },
        {
          inputAmout: 2.4,
          expectedPoints: 20,
        },
      ]

      checkEarnedPointsByLoyaltyStatus(paidAmounts, STATUSES.platinum)
    })
  })
})
