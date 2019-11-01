exports.run = async (client, message, args) => {
    const cmd = client.commands.get("balance");

    return cmd.run(client, message, args);
}