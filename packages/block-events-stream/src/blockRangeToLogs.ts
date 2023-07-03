import { OperatorFunction, exhaustMap, from, tap } from "rxjs";
import { FetchLogsResult, fetchLogs } from "./fetchLogsSubset";
import { AbiEvent, Address } from "abitype";
import { BlockNumber, PublicClient } from "viem";

export type BlockRangeToLogsOptions<TAbiEvents extends readonly AbiEvent[]> = {
  publicClient: PublicClient;
  address?: Address | Address[];
  events: TAbiEvents;
  maxBlockRange?: bigint;
};

export type BlockRangeToLogsResult<TAbiEvents extends readonly AbiEvent[]> = OperatorFunction<
  { startBlock: BlockNumber; endBlock: BlockNumber },
  FetchLogsResult<TAbiEvents>
>;

export function blockRangeToLogs<TAbiEvents extends readonly AbiEvent[]>({
  publicClient,
  address,
  events,
  maxBlockRange,
}: BlockRangeToLogsOptions<TAbiEvents>): BlockRangeToLogsResult<TAbiEvents> {
  let fromBlock: bigint | null = null;
  return exhaustMap(({ startBlock, endBlock }) => {
    fromBlock ??= startBlock;
    return from(
      fetchLogs({
        publicClient,
        address,
        events,
        fromBlock,
        toBlock: endBlock,
        maxBlockRange,
      })
    ).pipe(
      tap((result) => {
        fromBlock = result.toBlock + 1n;
      })
    );
  });
}
