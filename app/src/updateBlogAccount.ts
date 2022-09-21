import * as  anchor from '@project-serum/anchor';
import * as fs from 'fs'



    
async function updateBlogAcount() {

let blgContent = "The faster you move through space , the slower you travel through time Albert Einstein";


const ProgramId =new anchor.web3.PublicKey("A1Z5g145cwSqtHv5aEF7MeARfT46cm8cq8w33inoisuA")
// const provider = new anchor.An
const idl = JSON.parse(fs.readFileSync("./target/idl/solblog.json","utf8"));
console.log(Keypair.publicKey.toBase58());
const wallet = new anchor.Wallet(Keypair);
const con = new anchor.web3.Connection("https://api.devnet.solana.com");

console.log(con.getBalance(wallet.publicKey));

const provider = new anchor.AnchorProvider(con,wallet,anchor.AnchorProvider.defaultOptions());
const Program = new anchor.Program(idl,ProgramId,provider); 
const blogAcc = new anchor.web3.PublicKey("F9WaRTingV2aMeN7tgz2jvvS89CA2LzJ2SCC5ueg6a7M")
    await con.requestAirdrop(wallet.publicKey,anchor.web3.LAMPORTS_PER_SOL);
    
    
    let ix = await Program.methods.makePost(Buffer.from(blgContent))
    .accounts(
    {
        blogAccount:blogAcc,
        authority:wallet.publicKey,
       
    })
   .signers([Keypair])
   .rpc();
   
   console.log(ix);
}

updateBlogAcount().then()
{
    console.log("done!");
}
