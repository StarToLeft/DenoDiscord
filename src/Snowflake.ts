export default class Snowflake {
    private static DISCORD_EPOCH = 1420070400000;

    public static getSnowflakeDate(s: string) {
	const snoNum = BigInt.asUintN(65, BigInt(s));
	return new Date(this.DISCORD_EPOCH + Number(snoNum >> BigInt(22)));
}
}