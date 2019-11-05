exports.run = async (client, message, args) => {
    const cmd = client.commands.get("clubinfo");

    return cmd.run(client, message, args);
}