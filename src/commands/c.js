exports.run = async (client, message, args) => {
    const cmd = client.commands.get("club");

    return cmd.run(client, message, args);
}