import { Contract } from "@ethersproject/contracts";
import { Box, Grid } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { nftV1 as NFT } from "../../../connectors/address";
import nftAbi from "../../../abi/v1NFT.json";
import { formatUnits } from "@ethersproject/units";
import { NFTCard } from "./nftCard";
export const Container = () => {
  const { account, library } = useWeb3React();
  const [nfts, setNFTs] = useState();

  useEffect(() => {
    const getNfts = async () => {
      const signer = await library.getSigner();
      const contract = new Contract(NFT, nftAbi.abi, signer);
      const nftsArray = await contract.walletOfOwner(account);
      const processed = nftsArray.map((value) => {
        return Number(formatUnits(value, 0));
      });
      setNFTs(processed);
    };
    if (account && library) {
      getNfts();
    }
  }, [account, library]);
  return (
    <div>
      <Box width="100%" flexWrap="wrap" display="flex" flexDirection="row">
        <Grid container>
          {nfts &&
            nfts.map((value, index) => {
             return (
                <Grid key={`NFT_${account}_${index}`} item xs={12} sm={12} md={4} lg={3}>
                <NFTCard tokenId={value} />
              </Grid>
             )
            })}
            {
             nfts && nfts.length === 0 && (
                <h3>You do now have any Bossy Martian NFT's.</h3>
              ) 
            }
            {
              !nfts &&  <h3>Retriving your NFT's</h3>
            }
        </Grid>
      </Box>
    </div>
  );
};
