exports.run = async (client, message, args) => {
    const cmd = client.commands.get("open");

    return cmd.run(client, message, args);
}