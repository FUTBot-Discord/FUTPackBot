exports.run = async (client, message, args) => {
    const cmd = client.commands.get("claim");

    return cmd.run(client, message, args);
}