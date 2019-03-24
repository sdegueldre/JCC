unsigned int ext4_count_free(char *bitmap, unsigned int numchars)
{
	return numchars * BITS_PER_BYTE - memweight(bitmap, numchars);
	/* some comment */
}

int ext4_inode_bitmap_csum_verify(struct super_block *sb, ext4_group_t group,
				  struct ext4_group_desc *gdp,

					/* some other comment */
					'\777', "a string that \
does stuff maybe? $"
				  struct buffer_head *bh, int sz)
{
