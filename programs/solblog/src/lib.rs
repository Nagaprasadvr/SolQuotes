use anchor_lang::prelude::*;
use std::str::from_utf8;

declare_id!("A1Z5g145cwSqtHv5aEF7MeARfT46cm8cq8w33inoisuA");

#[program]
pub mod solblog {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let b_p_a = &mut ctx.accounts.blog_account;
        b_p_a.authority = *ctx.accounts.authority.key;

        Ok(())
    }

    pub fn make_post(ctx: Context<MakePost>, new_post: Vec<u8>) -> ProgramResult {
        let post = from_utf8(&new_post).map_err(|err| {
            msg!("Invalid UTF-8, from byte {}", err.valid_up_to());
            ProgramError::InvalidInstructionData
        })?;

        msg!(post);
        let b_acc = &mut ctx.accounts.blog_account;
        b_acc.latest_post = new_post;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init , payer=authority,space = 8+32+566)]
    pub blog_account: Account<'info, BlogAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]

pub struct BlogAccount {
    pub authority: Pubkey,
    pub latest_post: Vec<u8>,
}

#[derive(Accounts)]
pub struct MakePost<'info> {
    #[account(mut,has_one=authority)]
    pub blog_account: Account<'info, BlogAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
