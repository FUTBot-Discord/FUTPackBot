exports.run = async (client, message, args) => {
    const cmd = client.commands.get("commands");

    return cmd.run(client, message, args);
}