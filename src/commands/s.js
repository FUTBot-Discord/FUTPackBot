exports.run = async (client, message, args) => {
    const cmd = client.commands.get("select");

    return cmd.run(client, message, args);
}