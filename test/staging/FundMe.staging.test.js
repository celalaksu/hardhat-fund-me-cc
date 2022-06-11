// Unit tests are done locally
// - local hardhat
// - forked hardhat <- talk about this SourceLocation

const { assert, expect, AssertionError } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

const { developmentChains } = require("../../helper-hardhat-config")

// Staging tests can be done on a real testnet ( This is the last stop before production)
developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          //const sendValue = "1000000000000000000" // 1eth
          const sendValue = ethers.utils.parseEther("0.05") // 1 eth
          beforeEach(async function () {
              // deploy our fundMe contract using hardhat deploy
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allwos people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
