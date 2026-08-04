import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import type { Bounty, TransactionReceipt } from "./types";
import { TransactionStatus } from "genlayer-js/types";
import { parseEther } from "viem";

/**
 * FootballBets contract class for interacting with the GenLayer Football Betting contract
 */
class CleanCity {
  private contractAddress: `0x${string}`;
  private client: any;
  private studioUrl?: string;

  constructor(
    contractAddress: string,
    address?: string | null,
    studioUrl?: string
  ) {
    this.contractAddress = contractAddress as `0x${string}`;
    this.studioUrl = studioUrl;

    const config: any = {
      chain: studionet,
    };

    if (address) {
      config.account = address as `0x${string}`;
    }

    if (studioUrl) {
      config.endpoint = studioUrl;
    }

    this.client = createClient(config);
  }

  /**
   * Update the address used for transactions
   */
  updateAccount(address: string): void {
    const config: any = {
      chain: studionet,
      account: address as `0x${string}`,
    };

    if (this.studioUrl) {
      config.endpoint = this.studioUrl;
    }

    this.client = createClient(config);
  }

  async getBounties(): Promise<Bounty[]> {
    try {
      const bounties = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_all_bounties",
      });


      return bounties as Bounty[];
    } catch (error) {
      console.error("Error fetching bounties: ", error);
      throw new Error("Failed to fetch bounties");
    }
  }


  async getBounty(bountyId: string): Promise<Bounty> {
    try {
      const bounty = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_bounty",
        args: [bountyId]
      });


      return bounty as Bounty;
    } catch (error) {
      console.error("Error fetching bounty: ", error);
      throw new Error("Failed to fetch bounty");
    }
  }


  // async getLeaderboard(bountyId: string): Promise<Bounty> {
  //   try {
  //     const bounty = await this.client.readContract({
  //       address: this.contractAddress,
  //       functionName: "get_bounty",
  //       args: [bountyId]
  //     });


  //     return bounty as Bounty;
  //   } catch (error) {
  //     console.error("Error fetching bounty: ", error);
  //     throw new Error("Failed to fetch bounty");
  //   }
  // }





  async ClaimBounty(
    bounty_id: string
  ) {

    await this.client.connect("studionet");
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "claim_bounty",
        args: [bounty_id],
        value: BigInt(0)

      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.ACCEPTED,
      });

      return receipt as TransactionReceipt;
    } catch (error) {
      console.error("Error Claiming bounty:", error);
      throw new Error("Failed to claim bounty");
    }
  }


  async CreateBounty(
    title: string,
    description: string,
    location_description: string,
    category: string,
    before_image_url: string,
    reward_gen: number,
    duration_seconds: number,
    max_workers: number
  ) {

    await this.client.connect("studionet");
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "create_bounty",
        args: [title, description, location_description, category, before_image_url, reward_gen, duration_seconds, max_workers],
        value: parseEther(reward_gen.toString())

      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.ACCEPTED,
      });

      return receipt as TransactionReceipt;
    } catch (error) {
      console.error("Error creating bounty:", error);
      throw new Error("Failed to create bounty");
    }
  }

  async submitProof(
    bounty_id: string,
    after_image_url: string,
    session_token: string,
    notes: string
  ) {

    await this.client.connect("studionet");
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "submit_proof",
        args: [bounty_id, after_image_url, session_token, notes],
        value: BigInt(0)

      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.ACCEPTED,
      });

      return receipt as TransactionReceipt;
    } catch (error) {
      console.error("Error submitting proof:", error);
      throw new Error("Failed to submit proof");
    }
  }
  async generateSessionToken(
    bounty_id: string,
  ) {

    await this.client.connect("studionet");
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "generate_session_token",
        args: [bounty_id],
        value: BigInt(0)

      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.ACCEPTED,
      });

      return receipt as TransactionReceipt;
    } catch (error) {
      console.error("Error generating session token:", error);
      throw new Error("Failed to generate session token ");
    }
  }

}

export default CleanCity;
