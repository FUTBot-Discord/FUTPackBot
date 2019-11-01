exports.run = async (client, message, args) => {
    const cmd = client.commands.get("points");

    return cmd.run(client, message, args);
}