exports.run = async (client, message, args) => {
    const cmd = client.commands.get("market");

    return cmd.run(client, message, args);
}