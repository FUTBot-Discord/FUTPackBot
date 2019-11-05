exports.run = async (client, message, args) => {
    const cmd = client.commands.get("transfer");

    return cmd.run(client, message, args);
}