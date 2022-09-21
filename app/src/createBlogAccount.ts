import * as  anchor from '@project-serum/anchor';


import * as fs from 'fs'


    
async function createBlogAcount() {
    

const ProgramId =new anchor.web3.PublicKey("A1Z5g145cwSqtHv5aEF7MeARfT46cm8cq8w33inoisuA")
// const provider = new anchor.An
const idl = JSON.parse(fs.readFileSync("./target/idl/solblog.json","utf8"));

const wallet = new anchor.Wallet(Keypair);
const con = new anchor.web3.Connection("https://api.devnet.solana.com");

console.log(con.getBalance(wallet.publicKey));

const provider = new anchor.AnchorProvider(con,wallet,anchor.AnchorProvider.defaultOptions());
const Program = new anchor.Program(idl,ProgramId,provider); 
const blogAcc = anchor.web3.Keypair.generate();

    await con.requestAirdrop(wallet.publicKey,anchor.web3.LAMPORTS_PER_SOL);
    let ix = await Program.methods.initialize()
    .accounts(
    {
        blogAccount:blogAcc.publicKey,
        authority:wallet.publicKey,
        systemProgram:anchor.web3.SystemProgram.programId
    })
   .signers([blogAcc])
   .rpc();
   
   console.log("Payer:"+wallet.publicKey);
   console.log("Blog-Acc:"+blogAcc.publicKey);
}

createBlogAcount().then()
{
    console.log("done!");
}
